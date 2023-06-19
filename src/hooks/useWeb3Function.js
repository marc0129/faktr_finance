import React from 'react';
import axios from "axios";
import { constants, ethers } from "ethers";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { FAKTR_ADDRESS, PURCHASE_ADDRESS, UNDERWRITING_ADDRESS, USDT_ADDRESS } from "../constants/address";
import { iFaktrContract, iPurchaseContract, iUnderwritingContract, iUsdtContract } from "../constants/contracts";
import { FETCH_CHAIN_DATA } from "../store/actions";
import { toast } from 'react-toastify';
import config from "../config";

export function useWeb3Function() {

    const [txPending, setTxPending] = useState(false);
    const [txHash] = useState('');
    const dispatch = useDispatch();
    const api = axios.create({
        baseURL: config.API_SERVER
    });
    let toastId = React.useRef(null);

    const getUserInfo = useCallback(async (address, networkId, provider) => {

        const faktContract = iFaktrContract(FAKTR_ADDRESS[networkId], provider);
        const usdtContract = iUsdtContract(USDT_ADDRESS[networkId], provider);
        const underwritingContract = iUnderwritingContract(UNDERWRITING_ADDRESS[networkId], provider);
        const purchaseContract = iPurchaseContract(PURCHASE_ADDRESS[networkId], provider);

        let faktr_purchase_allowance = false;
        let faktr_underwriting_allowance = false;
        let faktr_balance = 0;
        faktr_purchase_allowance = ((await faktContract.allowance(address, PURCHASE_ADDRESS[networkId])) > 0) ? true : false
        faktr_underwriting_allowance = ((await faktContract.allowance(address, UNDERWRITING_ADDRESS[networkId])) > 0) ? true : false
        faktr_balance = ethers.utils.formatEther(await faktContract.balanceOf(address));

        let usdt_purchase_allowance = false;
        let usdt_balance = 0;

        usdt_purchase_allowance = ((await usdtContract.allowance(address, PURCHASE_ADDRESS[networkId])) > 0) ? true : false
        usdt_balance = ethers.utils.formatEther(await usdtContract.balanceOf(address));

        let coverDetail;
        coverDetail = await purchaseContract.getUserOrders(address);

        let underwritingDetail;
        underwritingDetail = await underwritingContract.getUserInfo(address);

        let faktPerProducts = [];

        if (underwritingDetail[0].length > 0) {
            faktPerProducts = underwritingDetail[0].map((pId, index) => ({ productId: Number(pId), amount: Number(underwritingDetail[1][index]) / Math.pow(10, 18) }));
        }

        let ethRewardsInUnderwriting = ethers.utils.formatEther(await underwritingContract.getUserRewards(address));

        dispatch({
            type: FETCH_CHAIN_DATA, payload: {
                chainData: {
                    faktr_balance: faktr_balance,
                    fakt_staked_balance: ethers.utils.formatEther(underwritingDetail[2]),
                    underwritings: faktPerProducts,
                    underwriting_reward: ethRewardsInUnderwriting,
                    covers: coverDetail,
                    faktr_purchase_allowance,
                    faktr_underwriting_allowance,
                    usdt_balance,
                    usdt_purchase_allowance
                }
            }
        });
    }, [dispatch]);

    const getAppInfo = useCallback(async (networkId) => {

    }, []);

    const purchaseInsurance = useCallback(async (params, networkId, signer) => {
        try {
            toastId = toast("Waiting purchase transaction to be confirmed", { autoClose: false });
            const purchaseContract = iPurchaseContract(PURCHASE_ADDRESS[networkId], signer);
            const premiumInWei = ethers.utils.parseUnits(String(params.premium), 18);
            const rewardsInWei = ethers.utils.parseUnits(String(params.rewards), 18);
            let purchaseTx;
            let res = await api.post('api/purchases/signature', {
                productId: params.productId,
                coverAmount: params.amount,
                coverToken: params.cover_token,
                premium: premiumInWei,
                payToken: params.pay_token,
                rewards: rewardsInWei
            });
            const signature = res.data.data.signature;
            if (params.pay_token === 0) {
                purchaseTx = await purchaseContract.buyInsurance(
                    params.productId,
                    params.amount,
                    params.cover_token,
                    premiumInWei,
                    params.pay_token,
                    params.period,
                    rewardsInWei,
                    signature,
                    { value: premiumInWei });
            } else {
                purchaseTx = await purchaseContract.buyInsurance(
                    params.productId,
                    params.amount,
                    params.cover_token,
                    premiumInWei,
                    params.pay_token,
                    params.period,
                    rewardsInWei,
                    signature
                );
            }
            await purchaseTx.wait();
            await getUserInfo(signer._address, networkId, signer);
            toast.update(toastId, { render: "Transaction was successfully sent", type: toast.TYPE.ERROR, autoClose: 5000 });
        } catch (error) {
            toast.update(toastId, { render: "Something went wrong", type: toast.TYPE.ERROR, autoClose: 5000 });
        } finally {
            setTxPending(false);
        }
    }, [dispatch]);

    const underwriting = useCallback(async (params, networkId, signer) => {
        try {
            toastId = toast("Waiting staking transaction to be confirmed", { autoClose: false });
            setTxPending(true);
            const underwritingContract = iUnderwritingContract(UNDERWRITING_ADDRESS[networkId], signer);
            const arr_amountInWei = params.map(item => ethers.utils.parseUnits(String(item.amount), 18));
            const arr_pId = params.map(item => item.product_id);
            let res = await api.post('api/staking/stake/signature', { productIds: arr_pId, stakeAmounts: arr_amountInWei })
            const signature = res.data.data.signature;
            const underwritingTx = await underwritingContract.deposit(arr_amountInWei, arr_pId, signature);
            await underwritingTx.wait();
            res = await api.post('/api/staking/stake/confirm', {
                productIds: arr_pId,
                stakeAmounts: params.map(item => Number(item.amount)),
                stakeTransactionId: underwritingTx.hash,
                address: signer._address
            })
            await getUserInfo(signer._address, networkId, signer);
            toast.update(toastId, { render: "Transaction was successfully sent", type: toast.TYPE.ERROR, autoClose: 5000 });
        } catch (error) {
            console.log(error);
            toast.update(toastId, { render: "Something went wrong", type: toast.TYPE.ERROR, autoClose: 5000 });
        } finally {
            setTxPending(false)
        }
    }, []);

    const approveFaktr = useCallback(async (to, networkId, signer) => {
        try {
            toastId = toast("Waiting approve transaction to be confirmed", { autoClose: false });
            setTxPending(true);
            const faktrContract = iFaktrContract(FAKTR_ADDRESS[networkId], signer);
            const approveTx = await faktrContract.approve(to, constants.MaxUint256);
            await approveTx.wait();
            await getUserInfo(signer._address, networkId, signer);
            toast.update(toastId, { render: "Transaction was successfully sent", type: toast.TYPE.ERROR, autoClose: 5000 });
        } catch (error) {
            console.log(error)
            toast.update(toastId, { render: "Something went wrong", type: toast.TYPE.ERROR, autoClose: 5000 });
        } finally {
            setTxPending(false);
        }
    }, []);

    const approveUsdt = useCallback(async (to, networkId, signer) => {
        try {
            toastId = toast("Waiting approve transaction to be confirmed", { autoClose: false });
            setTxPending(true);
            const usdtContract = iUsdtContract(USDT_ADDRESS[networkId], signer);
            const approveTx = await usdtContract.approve(to, constants.MaxUint256);
            await approveTx.wait();
            await getUserInfo(signer._address, networkId, signer);
            toast.update(toastId, { render: "Transaction was successfully sent", type: toast.TYPE.ERROR, autoClose: 5000 });
        } catch (error) {
            console.log(error)
            toast.update(toastId, { render: "Something went wrong", type: toast.TYPE.ERROR, autoClose: 5000 });
        } finally {
            setTxPending(false);
        }
    }, [])

    const claimStakingReward = useCallback(async (networkId, signer) => {
        try {
            toastId = toast("Waiting claim transaction to be confirmed", { autoClose: false });
            setTxPending(true);
            const underwritingContract = iUnderwritingContract(UNDERWRITING_ADDRESS[networkId], signer);
            const claimTx = await underwritingContract.claim();
            await claimTx.wait();
            await getUserInfo(signer._address, networkId, signer);
            toast.update(toastId, { render: "Transaction was successfully sent", type: toast.TYPE.ERROR, autoClose: 5000 });
        } catch (error) {
            console.log(error)
            toast.update(toastId, { render: "Something went wrong", type: toast.TYPE.ERROR, autoClose: 5000 });
        } finally {
            setTxPending(false);
        }
    }, [])

    return {
        txPending,
        txHash,
        underwriting,
        purchaseInsurance,
        getUserInfo,
        getAppInfo,
        approveFaktr,
        approveUsdt,
        claimStakingReward
    }
}