import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import CardsView from './CardsView';
import { PURCHASE_ADDRESS } from '../../constants/address';
import QuoteView from './QuoteView';
import { useWeb3Function } from '../../hooks/useWeb3Function';
import { useAccount, useBalance, useNetwork, useSigner } from 'wagmi';
import { trim } from '../../helpers/trim';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const cardTitle = 'Choose the type of cover you want and get a quote';
const steps = ['Select Project', 'Get a Quote', 'Confirm'];


const useStyles = makeStyles((theme) => ({
    stepper: {
        '& .MuiSvgIcon-root': {
            width: '32px',
            height: '32px'
        },
        '& .MuiSvgIcon-root.Mui-active,& .MuiSvgIcon-root.Mui-completed ': {
            color: theme.palette.common.main
        },
        '& .MuiStepLabel-label.Mui-active,& .MuiStepLabel-label.Mui-completed': {
            color: theme.palette.common.main,
            fontWeight: 'bold'
        }
    }
}));

const Purchase = () => {

    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const { chain } = useNetwork();
    const { data: signer } = useSigner();
    const { purchaseInsurance, approveUsdt, approveFaktr } = useWeb3Function();
    const faktr_balance = useSelector(state => state.account.chainData.faktr_balance);
    const usdt_balance = useSelector(state => state.account.chainData.usdt_balance);
    const { address } = useAccount();
    const { data: native_balance } = useBalance({ addressOrName: address });

    const [selectedProduct, setProduct] = useState();
    const [quote, setQuote] = useState({
        amount: 0,
        cover_token: 0,
        period: 30,
        pay_token: 0
    });
    const [premium, setPremium] = useState(0);
    const [premiumInFaktr, setPremiumInFaktr] = useState(0);

    const protocols = useSelector(state => state.app.products);
    const stats = useSelector(state => state.app.stats);
    const userChainData = useSelector(state => state.account.chainData);

    const handleNext = () => {
        if (activeStep < 2)
            setActiveStep((previousStep) => (previousStep + 1));
        if (activeStep >= 1) {
            if (chain && validate()) {
                if (!userChainData.usdt_purchase_allowance && quote.pay_token === 1) {
                    approveUsdt(
                        PURCHASE_ADDRESS[chain.id], chain.id, signer
                    )
                    return;
                }
                if (!userChainData.faktr_purchase_allowance && quote.pay_token === 2) {
                    approveFaktr(
                        PURCHASE_ADDRESS[chain.id], chain.id, signer
                    )
                    return;
                }
                purchaseInsurance({
                    ...quote,
                    productId: selectedProduct.product_id,
                    premium,
                    rewards: premiumInFaktr
                },
                    chain.id,
                    signer)
            }
        }
    }

    useEffect(() => {
        let premium = 0;
        if (selectedProduct && stats) {
            const k = selectedProduct.yearly_cost * quote.amount * quote.period / 30;
            if (quote.cover_token === 0) {
                setPremiumInFaktr(k * stats.faktrPrice.NATIVE.FAKTR);
                if (quote.pay_token === 0) {
                    premium = trim(k, 3)
                }
                else if (quote.pay_token === 1) {
                    premium = trim(k * stats.faktrPrice.NATIVE.USDT, 3)
                }
                else if (quote.pay_token === 2) {
                    premium = trim(k * stats.faktrPrice.NATIVE.FAKTR, 3)
                }
            }
            else if (quote.cover_token === 1) {
                setPremiumInFaktr(k * stats.faktrPrice.USDT.FAKTR);
                if (quote.pay_token === 0) {
                    premium = trim(k * stats.faktrPrice.USDT.NATIVE, 3)
                }
                else if (quote.pay_token === 1) {
                    premium = trim(k, 3)
                }
                else if (quote.pay_token === 2) {
                    premium = trim(k * stats.faktrPrice.USDT.FAKTR, 3)
                }
            }
        }
        setPremium(premium);
    }, [quote])

    const handleQuote = (id) => {
        setProduct(protocols[id]);
    }

    const validate = () => {
        let ethBalance = trim((native_balance?.value) / Math.pow(10, 18), 3);
        console.log(quote.pay_token, premium, usdt_balance)
        if (quote.period < 30 || quote.period > 365) {
            toast.error("Select the period between 30-365 days.");
            return false;
        }
        if (quote.amount === 0 || quote.amount === '') {
            toast.error('Input cover amount.');
            return false;
        }
        if (quote.pay_token === 0 && Number(premium) > (ethBalance)) {
            toast.error('Premium exceed token balance.');
            return false;
        }
        if (quote.pay_token === 1 && Number(premium) > (usdt_balance)) {
            console.log(premium, usdt_balance)
            toast.error('Premium exceed USDT balance.');
            return false;
        }
        if (quote.pay_token === 2 && Number(premium) > (faktr_balance)) {
            toast.error('Premium exceed FAKTR balance.');
            return false;
        }
        return true;
    }

    return (
        <MainCard title={cardTitle} sx={{ minHeight: '85vh', overflow: "visible" }}>
            <Grid container>
                <Grid item xs={12} sx={{ mb: 3, display: 'flex', justifyContent: 'center' }} alignItems='center'>
                    <Box sx={{ width: { xs: '100%', md: '80%' } }}>
                        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                            {
                                steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>{
                    (() => {
                        if (activeStep === 0)
                            return (
                                <CardsView
                                    next={handleNext}
                                    protocols={protocols}
                                    onClickQuote={handleQuote}
                                />
                            )
                        else if (activeStep === 1 || activeStep === 2)
                            return (
                                <QuoteView
                                    selectedProduct={selectedProduct}
                                    next={handleNext}
                                    quoteDetail={quote}
                                    setQuoteDetail={setQuote}
                                    premium={premium}
                                />
                            )
                    })()
                }
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Purchase;