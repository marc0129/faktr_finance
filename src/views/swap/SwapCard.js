import React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles';
import { Card, Grid, Typography, Avatar, Button, OutlinedInput, InputAdornment } from '@material-ui/core';
import faktr from '../../assets/images/logo.png';
import eth from '../../assets/images/icons/ethereum.svg'
import { Box } from '@material-ui/system';
import { IconArrowDown } from '@tabler/icons';
import { IconArrowsDownUp, IconCheckbox } from '@tabler/icons';


const useStyle = makeStyles((theme) => ({
    card: {
        height: 590,
        padding: '20px',
        backgroundColor: '#FFF4FF',
        border: `1px solid ${theme.palette.orange.main}`
    },
    avatar: {
        width: '30px',
        height: '30px',
        backgroundColor: theme.palette.orange.light
    },
    inputBox: {
        padding: '10px',
        border: `1px solid ${theme.palette.orange.main}`,
        borderRadius: '15px',
        backgroundColor: theme.palette.orange.main
    },
    approveButton: {
        width: '100%',
        height: '50px',
        borderRadius: '15px',
        color: "#FFF",
        fontWeight: 'bold',
        backgroundColor: theme.palette.orange.main,
        '&:hover': {
            color: '#FFF',
            backgroundColor: theme.palette.orange.main
        }
    },
    swapButton: {
        width: '100%',
        height: '50px',
        borderRadius: '15px',
        color: theme.palette.orange.dark,
        fontWeight: 'bold',
        border: `1px solid ${theme.palette.orange.main}`,
        '&:hover': {
            color: '#FFF',
            backgroundColor: theme.palette.orange.main
        }
    },
    slippageInput: {
        width: '100px',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.orange.dark,
            borderRadius: '20px'
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.orange.dark,
            borderRadius: '20px'
        },
        '&:hover': {
            '&.MuiOutlinedInput-notchedOutline': {
                color: theme.palette.orange.dark
            }
        }
    },
    infoBox: {
        width: '100%',
        padding: '15px',
        marginTop: '10px',
        borderRadius: '15px',
        backgroundColor: theme.palette.orange.main,
        '& .MuiTypography-root': {
            color: '#FFF',
            fontWeight: '600'
        }
    }
}));

const SwapCard = () => {

    const classes = useStyle();
    const theme = useTheme();
    const [slippage, setSlippage] = React.useState(1);

    const [hover, setHover] = React.useState(false);

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <Grid container display='flex' direction='column' sx={{ px: 3, pb: 0 }}>
                    <Grid item xs={12} display='flex' justifyContent='start'>
                        <Typography component='span' sx={{ fontSize: '20px', fontWeight: 'bold', color: 'orange.dark' }}>S w a p</Typography>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='start'>
                        <Typography component='span' sx={{ fontSize: '16px', fontWeight: 600, color: 'orange.dark', pb: '10px' }}>( Fast, Secure, KYC-Free )</Typography>
                    </Grid>

                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box className={classes.inputBox}>
                            <Box sx={{ display: 'flex', color: '#FFF', justifyContent: 'space-between' }} pt={1} pb={1.5}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>From:</Typography>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Balance:{0}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', color: '#FFF', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>0.00</Typography>
                                <Box display='flex'>
                                    <Avatar rounded className={classes.avatar} sx={{ mx: 1 }}>
                                        <img src={faktr} alt='faktr' style={{ width: '20px', height: '20px' }} />
                                    </Avatar>
                                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>FAKTR</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='center'>
                        <Box
                            onMouseOver={() => setHover(true)}
                            onMouseOut={() => setHover(false)}
                            sx={{ cursor: 'pointer', height: '25px' }}
                        >
                            {
                                hover ? <IconArrowsDownUp color={theme.palette.orange.dark} height='20px' /> :
                                    <IconArrowDown color={theme.palette.orange.dark} />

                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.inputBox}>
                            <Box sx={{ display: 'flex', color: '#FFF', justifyContent: 'space-between' }} pt={1} pb={1.5}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>To:</Typography>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Balance:{0}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', color: '#FFF', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>0.00</Typography>
                                <Box display='flex'>
                                    <Avatar rounded className={classes.avatar} sx={{ mx: 1 }}>
                                        <img src={eth} alt='faktr' style={{ width: '20px', height: '20px' }} />
                                    </Avatar>
                                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>ETH</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} display='flex' alignItems='center' justifyContent='flex-end'>
                        <IconCheckbox color={theme.palette.orange.dark} width='28px' height='28px' />
                        <Typography sx={{ color: 'orange.dark', fontWeight: 'bold', px: 0.5 }}>Slippage</Typography>
                        <OutlinedInput
                            value={slippage}
                            onChange={(evt) => setSlippage(evt.target.value)}
                            endAdornment={<InputAdornment position='end'>%</InputAdornment>}
                            className={classes.slippageInput}
                        />
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={6}>
                            <Button className={classes.approveButton}>Approve FAKTR</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.swapButton}>S w a p</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.infoBox}>
                            <Grid container spacing={1} display='flex' direction='column'>
                                <Grid item display='flex' justifyContent='space-between'>
                                    <Typography>Minium Received</Typography>
                                    <Typography></Typography>
                                </Grid>
                                <Grid item display='flex' justifyContent='space-between'>
                                    <Typography>Price Impace</Typography>
                                    <Typography></Typography>
                                </Grid>
                                <Grid item display='flex' justifyContent='space-between'>
                                    <Typography>Liquidity Fee</Typography>
                                    <Typography>0% No Fee</Typography>
                                </Grid>
                                <Grid item display='flex' justifyContent='space-between'>
                                    <Typography>Route</Typography>
                                    <Typography>{'FAKTR <-> ETH'}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </React.Fragment >
    );
}

export default SwapCard;