import React from 'react';
import { Grid, Typography, OutlinedInput, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/system';
import { trim } from '../../helpers/trim';

const useStyle = makeStyles((theme) => ({
    vStakeInput: {
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
        left: 20,
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
    stakeButton: {
        minWidth: '150px',
        marginTop: 20,
        margin: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 15,
        fontSize: '16px',
        backgroundColor: theme.palette.common.main,
        color: theme.palette.common.paper,
        '&:hover': {
            color: theme.palette.common.paper,
            backgroundColor: theme.palette.common.main
        }
    }
}))

const Stake = () => {

    const classes = useStyle();

    const [vStake, setStake] = React.useState(0);
    const [vPeriod, setPeriod] = React.useState(30);

    return (
        <React.Fragment>
            <Grid container p={3} mb={5}>
                <Grid item xs={12} mt={3}>
                    <Typography sx={{ fontSize: '24px', mb: 3, ml: 1, color: '#666' }}>
                        Become a claims assessor
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ fontSize: '16px', lineHeight: '36px', color: '#666' }}>
                        To earn reward as a claims assessor you need to stake an amount of FAKTR for 30 days minimum. Your verdict power and rewards are proportional to your stake and for the specified period you can not sell these tokens or use them for other purposes. If the Advisory Board deems voting to be fraudulent, they have the power to burn this amount.
                    </Typography>
                </Grid>
                <Grid container item xs={12} md={6} px={3}>
                    <Grid container item xs={12} display="flex" direction='column' justifyContent='start' alignItems='start' ml={2}>
                        <Box sx={{ position: 'relative', mb: 3 }}>
                            <Typography component='span' className={classes.inputTitle}>Stake Amount</Typography>
                            <OutlinedInput
                                sx={{ py: 4, px: 2 }}
                                endAdornment={<Typography pl={3}>FAKTR</Typography>}
                                value={vStake}
                                onChange={(e) => setStake(e.target.value)}
                                className={classes.vStakeInput}
                                fullWidth
                                type='number'
                                inputProps={{ min: 0 }}
                            >

                            </OutlinedInput>
                            <Typography className={classes.valueTitle}>Stake Value: ${trim(vStake * 0.4, 3)}</Typography>
                        </Box>
                        <Box sx={{ position: 'relative', mb: 3 }}>
                            <Typography component='span' className={classes.inputTitle}>Stake Period</Typography>
                            <OutlinedInput
                                sx={{ py: 4, px: 2 }}
                                endAdornment={<Typography pl={3}>DAYS</Typography>}
                                value={vPeriod}
                                onChange={(e) => setPeriod(e.target.value)}
                                className={classes.vStakeInput}
                                fullWidth
                                type='number'
                                inputProps={{ min: 30 }}
                            >
                            </OutlinedInput>
                            <Typography className={classes.valueTitle}>Stake Period Ends: </Typography>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Box>
                            <Typography sx={{ fontSize: '16px', mb: 2 }}>You need to stake FAKTR tokens at least 30 days to become a claim accessor</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '16px' }}>Approve FAKTR tokens to grant the token controller permission </Typography>
                        </Box>
                    </Grid> */}
                    <Grid item xs={12} display='flex' justifyContent='center' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <Button className={classes.stakeButton}>Approve FAKTR</Button>
                        <Button className={classes.stakeButton}>Stake</Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Stake;