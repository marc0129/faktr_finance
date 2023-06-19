import React from 'react';
import { Card, Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText, OutlinedInput, ToggleButtonGroup, ToggleButton, Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IconPoint } from '@tabler/icons';
import { trim } from '../../helpers/trim';
import config from '../../config';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    quoteView: {
        '& .MuiCard-root': {
            border: `1px solid ${theme.palette.common.mainLight}`,
            padding: '20px'
        },
        '& .MuiTypography-root': {
            fontSize: '16px',
            lineHeight: '30px'
        },
        '& .MuiList-root': {
            padding: 0
        },
        '& .MuiListItem-root': {
            padding: 0,
            paddingLeft: '15px',
            '& .MuiListItemText-primary': {
                color: '#777'
            },
            '& .MuiListItemIcon-root': {
                minWidth: '25px'
            }
        }
    },
    outlinedInput: {
        maxWidth: '350px',
        borderRadius: '25px',
        backgroundColor: '#fff',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.mainLight
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.mainLight
        },
        '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.common.mainLight
            }
        },
        '& input': {
            color: '#666',
            fontSize: '24px',
            textAlign: 'right'
        }


    },
    inputTitle: {
        zIndex: 1,
        color: '#666',
        //  backgroundColor: theme.palette.orange.light,
        position: 'absolute',
        top: 10,
        left: 40,
        fontSize: '16px'
    },
    valueTitle: {
        zIndex: 1,
        color: '#666',
        //  backgroundColor: theme.palette.orange.light,
        position: 'absolute',
        bottom: 10,
        right: 30,
        fontSize: '16px'
    },
    buttonGroup: {
        '& .MuiToggleButton-root': {
            border: `1px solid ${theme.palette.common.main}`,
            color: theme.palette.common.main,
            padding: '5px',
            '&:hover': {
                backgroundColor: theme.palette.common.main,
                color: '#fff'
            },
            '&.Mui-selected': {
                backgroundColor: theme.palette.common.main,
                color: '#fff'
            }
        }
    },
    confirmButton: {
        marginBottom: '20px',
        width: '200px',
        height: '40px',
        borderRadius: '15px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: theme.palette.common.paper,
        background: theme.palette.common.main,
        '&:hover': {
            background: theme.palette.common.main,
            color: '#FFF'
        }
    },
    summaryBox: {
        position: 'sticky',
        top: '150px'
    }
}));


const QuoteView = ({ selectedProduct, next, quoteDetail, setQuoteDetail, premium }) => {

    const classes = useStyles();
    const nativeToken = useSelector(state => state.app.nativeToken);
    const userChainData = useSelector(state => state.account.chainData);
    const faktr_balance = useSelector(state => state.account.chainData.faktr_balance);
    const usdt_balance = useSelector(state => state.account.chainData.usdt_balance);
    const { address } = useAccount();
    const { data: native_balance } = useBalance({ addressOrName: address });

    const [confirmBtnText, setConfirmBtnText] = useState('Confirm');

    useEffect(() => {
        if (!userChainData.usdt_purchase_allowance && quoteDetail.pay_token === 1)
            setConfirmBtnText('Approve')
        else if (!userChainData.faktr_purchase_allowance && quoteDetail.pay_token === 2) {
            setConfirmBtnText('Approve')
        }
        else
            setConfirmBtnText('Confirm')
    }, [userChainData, quoteDetail])

    const handleSelectToken = (evt, newToken) => {
        if (newToken !== null) {
            setQuoteDetail({ ...quoteDetail, pay_token: newToken });
            if (newToken === 0)
                setTokenText(nativeToken);
            else if (newToken === 1)
                setTokenText('USDT');
            else if (newToken === 2)
                setTokenText('FAKTR');
        }
    }

    const handleSelectCoverToken = (evt) => {
        setQuoteDetail({ ...quoteDetail, cover_token: evt.target.value })
    }
    const [tokenText, setTokenText] = useState(nativeToken);

    return (
        <React.Fragment>
            <Grid container className={classes.quoteView} spacing={3}>
                <Grid item container xs={12} md={8} spacing={2}>
                    <Grid item xs={12} >
                        <Card>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 'bold' }}>Qutoe Detail</Typography>
                                    <Typography >This product covers any token or combination of tokens you have in the protocol. In case of a claim, you will receive the equivalent of your lost funds in USDT up to the covered amount. Alternatively you can select {nativeToken}.</Typography>
                                </Grid>
                                <Grid container item>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ position: 'relative', my: 3, px: 2 }}>
                                            <Typography component='span' className={classes.inputTitle}>
                                                Cover Amount
                                            </Typography>
                                            <OutlinedInput
                                                sx={{ py: 4, px: 2 }}
                                                endAdornment={
                                                    <Select
                                                        labelId='cover amount input'
                                                        value={quoteDetail.cover_token}
                                                        onChange={handleSelectCoverToken}
                                                    >
                                                        <MenuItem pl={3} value={0}>{nativeToken}</MenuItem>
                                                        <MenuItem pl={1} value={1}>USDT</MenuItem>
                                                    </Select>}
                                                value={quoteDetail.amount}
                                                onChange={(e) => setQuoteDetail({ ...quoteDetail, amount: e.target.value })}
                                                className={classes.outlinedInput}
                                                fullWidth
                                                type='number'
                                                inputProps={{ min: 0 }}
                                            >
                                            </OutlinedInput>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ position: 'relative', my: 3, px: 2 }}>
                                            <Typography component='span' className={classes.inputTitle}>Period(30 days minium)</Typography>
                                            <OutlinedInput
                                                sx={{ py: 4, px: 2 }}
                                                endAdornment={<Typography pl={3}>DAYS</Typography>}
                                                value={quoteDetail.period}
                                                onChange={(e) => setQuoteDetail({ ...quoteDetail, period: e.target.value })}
                                                className={classes.outlinedInput}
                                                fullWidth
                                                type='number'
                                                inputProps={{ min: 30 }}
                                            >
                                            </OutlinedInput>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Terms and Conditions</Typography>
                            </Box>
                            <Box>
                                <Typography>Covered:</Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconPoint />
                                        </ListItemIcon>
                                        <ListItemText primary="contract bugs"></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconPoint />
                                        </ListItemIcon>
                                        <ListItemText primary="economic attacks, including oracle failures"></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconPoint />
                                        </ListItemIcon>
                                        <ListItemText primary="governance attacks"></ListItemText>
                                    </ListItem>
                                </List>
                            </Box>
                            <Box>
                                <Typography>Claiming:</Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconPoint />
                                        </ListItemIcon>
                                        <ListItemText primary="You must provide proof of the incurred loss at claim time"></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconPoint />
                                        </ListItemIcon>
                                        <ListItemText primary="You should wait 72 hours after the event, so assessors have all details to make a decision."></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconPoint />
                                        </ListItemIcon>
                                        <ListItemText primary="You can claim up to 35 days after the cover period expires, given your cover was active when the incident happened."></ListItemText>
                                    </ListItem>
                                </List>
                            </Box>
                            <Box>
                                <Typography>This cover is not a contract of insurance. Cover is provided on a discretionary basis with faktr finance members having the final say on which claims are paid. Check out full details </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={classes.summaryBox}>
                        <Typography sx={{ fontWeight: 'bold' }}>Summary</Typography>
                        <Box sx={{ p: 2, display: 'flex', alignContent: 'center' }}>
                            <img src={config.API_SERVER + selectedProduct.logo} alt='logo' style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <Typography>{selectedProduct.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Capacity:</Typography>
                            <Typography>  {(selectedProduct.capacity.ETH >= 1000 ?
                                trim(selectedProduct.capacity.ETH / 1000, 2) + 'k ' + nativeToken : trim(selectedProduct.capacity.ETH, 2) + ' ' + nativeToken) +
                                (selectedProduct.capacity.USDT >= 1000 ? '/' + trim(selectedProduct.capacity.USDT / 1000, 2) + 'k USDT' :
                                    + '/' + trim(selectedProduct.capacity.USDT, 2) + 'USDT')
                            }
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>You will pay:</Typography>
                            <Typography>{premium + ' ' + tokenText}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Balance:</Typography>
                            <Typography>{
                                (() => {
                                    if (quoteDetail.pay_token === 0)
                                        return trim((native_balance?.value) / Math.pow(10, 18), 3) + nativeToken;
                                    else if (quoteDetail.pay_token === 1)
                                        return trim(usdt_balance, 2) + ' USDT';
                                    else if (quoteDetail.pay_token === 2)
                                        return trim(faktr_balance, 2) + ' FAKTR'
                                })()
                            }
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography>Pay In:</Typography>
                            <ToggleButtonGroup
                                className={classes.buttonGroup}
                                value={quoteDetail.pay_token}
                                onChange={handleSelectToken}
                                exclusive
                            >
                                <ToggleButton value={0}>{nativeToken}</ToggleButton>
                                <ToggleButton value={1}>USDT</ToggleButton>
                                <ToggleButton value={2}>Faktr</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button className={classes.confirmButton} onClick={next}>
                                {confirmBtnText}
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default QuoteView;