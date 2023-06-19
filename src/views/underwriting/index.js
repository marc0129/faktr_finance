import React, { useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Box, Grid, Stepper, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SelectView from './SelectView';
import DepositView from './DepositView';

import { useWeb3Function } from '../../hooks/useWeb3Function';
import { useNetwork, useSigner } from 'wagmi';
import { useSelector } from 'react-redux';
import { UNDERWRITING_ADDRESS } from '../../constants/address';
import { toast } from 'react-toastify';

const cardTitle = 'Earn rewards by staking FATKR on project you think are secure !';

const steps = ['Select Project', 'Deposit and Stake', 'Confirm'];


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

const Underwriting = () => {

    const protocols = useSelector(state => state.app.products);

    const [activeStep, setActiveStep] = useState(0);
    const [acceptRisk, setAcceptRisk] = useState(false);
    const classes = useStyles();
    const { underwriting, approveFaktr } = useWeb3Function();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();
    const faktr_underwriting_allowance = useSelector((state) => state.account.chainData.faktr_underwriting_allowance)
    const faktr_balance = useSelector((state) => state.account.chainData.faktr_balance)
    const handleNext = () => {
        if (activeStep < 2)
            setActiveStep((previousStep) => (previousStep + 1));
        if (activeStep >= 1) {
            if (chain && validate()) {
                if (faktr_underwriting_allowance)
                    underwriting(selectedItems, chain.id, signer);
                else
                    approveFaktr(UNDERWRITING_ADDRESS[chain?.id], chain?.id, signer);
            }
        }
    }

    const handleBefore = () => {
        setActiveStep((previous) => (previous - 1));
    }

    const [selectedItems, setSelectedItems] = useState([]);


    const handleClickSelect = (product_id) => {
        setSelectedItems([...selectedItems, { product_id, amount: 0 }]);
    }

    const handleClickRemove = (product_id) => {
        setSelectedItems(selectedItems.filter(item => item.product_id !== product_id));
    }

    const handleSelectedItems = (e, p) => {
        const newItems = selectedItems.map(item => {
            if (item.product_id === p.product_id) {
                return { ...item, amount: e.target.value }
            }
            return item
        })
        setSelectedItems(newItems)
    }

    const validate = () => {
        const totalFaktrForStake = selectedItems.reduce((pre, cur) => (pre + Number(cur.amount)), 0)
        if (totalFaktrForStake > faktr_balance) {
            toast.error("Staking amount exceed balance");
            return false;
        }
        for (let i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i].amount === 0 || selectedItems[i].amount === '') {
                toast.error("Input staking amount");
                return false;
            }
        }
        return true;
    }
    return (
        <MainCard title={cardTitle} sx={{ minHeight: '85vh', overflow: "visible" }}>
            <Grid container>
                <Grid container item xs={12} sx={{ mb: 3 }} alignItems='center' justifyContent='center'>
                    <Box sx={{ width: '80%' }}>
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
                <Grid item xs={12}>{
                    (() => {
                        if (activeStep === 0)
                            return (
                                <SelectView
                                    protocols={protocols}
                                    selectedItems={selectedItems}
                                    next={handleNext}
                                    onClickSelect={handleClickSelect}
                                    onClickRemove={handleClickRemove}
                                />)
                        else if (activeStep === 1 || activeStep === 2)
                            return (
                                <DepositView
                                    selectedItems={selectedItems}
                                    setSelectedItems={handleSelectedItems}
                                    protocols={protocols}
                                    next={handleNext}
                                    onClickRemove={handleClickRemove}
                                    onClickAddProject={handleBefore}
                                    confirmRisk={acceptRisk}
                                    onClickConfirmRisk={setAcceptRisk}
                                />
                            )
                    })()
                }
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Underwriting;