import React from 'react';
import { Card, Grid, Box, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { trim } from '../../helpers/trim';
import { useWeb3Function } from '../../hooks/useWeb3Function';
import { useNetwork, useSigner } from 'wagmi';

const useStyles = makeStyles((theme) => ({
    rewardView: {
        '& .MuiCard-root': {
            minHeight: '256px',
            padding: '20px',
            backgroundColor: '#fff',
            border: `1px solid ${theme.palette.common.mainLight}`
        },
        '& .MuiTableContainer-root': {
            minHeight: '300px',
            backgroundColor: '#fff',
            borderRadius: '15px',
            border: `1px solid ${theme.palette.common.mainLight}`,
            '& .MuiTableCell-root': {
                textAlign: 'center'
            }
        }
    },
    baseButton: {
        minWidth: '200px',
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

const cardTitle = 'Reward'
const Reward = () => {

    const classes = useStyles();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();

    const rewardsInUnderwriting = useSelector((state) => state.account.chainData.underwriting_reward);
    const { claimStakingReward } = useWeb3Function();
    const claimStakeReward = () => {
        if (chain) {
            claimStakingReward(chain.id, signer);
        }
    }
    return (
        <MainCard title={cardTitle} sx={{ minHeight: '85vh' }}>
            <Grid container spacing={2} className={classes.rewardView}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ marginLeft: '20px', fontSize: '18px' }}>You have {Number(trim(rewardsInUnderwriting, 3))} FAKTR rewards available now.</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <Typography sx={{ fontSize: '20px', my: 1 }}>Staking</Typography>
                        <Typography sx={{ fontSize: '24px', my: 2 }}>{Number(trim(rewardsInUnderwriting, 3))} FAKTR</Typography>
                        <Typography sx={{ fontSize: '16px' }}>Earn rewards by staking on projects you think are secure. 🔐</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {
                                Number(rewardsInUnderwriting) > 0 ?
                                    <Button className={classes.baseButton} onClick={claimStakeReward}>
                                        Claim
                                    </Button> :
                                    <Link to='/underwriting'>
                                        <Button className={classes.baseButton} onClick={claimStakeReward}>
                                            Stake
                                        </Button>
                                    </Link>
                            }
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <Typography sx={{ fontSize: '20px', my: 1 }}>Claim Assessment</Typography>
                        <Typography sx={{ fontSize: '24px', my: 2 }}>0 FAKTR</Typography>
                        <Typography sx={{ fontSize: '16px', mb: 2.5 }}>Earn rewards by assessing claims. 🔍</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to='/claim'>
                                <Button className={classes.baseButton}>
                                    View open Claims
                                </Button>
                            </Link>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <Typography sx={{ fontSize: '20px', my: 1 }}>Governance</Typography>
                        <Typography sx={{ fontSize: '24px', my: 2 }}>0 FAKTR</Typography>
                        <Typography sx={{ fontSize: '16px', mb: 2.5 }}>Earn Rewards by voting in governance. 🗳</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to={{ pathname: 'https://snapshot.org' }} target="_blank">
                                <Button className={classes.baseButton}>
                                    Vote
                                </Button>
                            </Link>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: '18px', mx: 2, mb: 2 }}>Rewards History</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Transaction Hash</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Claim Amount</TableCell>
                                    <TableCell>Total Rewards To Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Reward;