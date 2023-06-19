import React from 'react';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, Card, Typography, OutlinedInput, InputAdornment, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import config from '../../config';
import { trim } from '../../helpers/trim';

const useStyle = makeStyles((theme) => ({
    table: {
        borderRadius: '15px',
        border: `1px solid ${theme.palette.common.mainLight}`,
        '& .MuiTableCell-root': {
            color: '#666',
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            fontSize: '16px',
            whiteSpace: 'nowrap',
            backgroundColor: theme.palette.common.paper,
            textAlign: 'center'
        }
    },
    removeButton: {
        color: theme.palette.common.main,
        backgroundColor: theme.palette.common.paper
    },
    card: {
        padding: '20px',
        border: `1px solid ${theme.palette.common.mainLight}`,
        background: theme.palette.common.paper,
        '& .MuiTypography-root': {
            color: '#666',
            fontSize: '16px',
            lineHeight: '30px'
        }
    },
    checkBox: {
        color: theme.palette.common.main,
        '&.Mui-checked': {
            color: theme.palette.common.main
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
    }
}))


const DepositView = ({
    protocols,
    selectedItems,
    next,
    onClickRemove,
    onClickAddProject,
    setSelectedItems,
    confirmRisk,
    onClickConfirmRisk
}) => {

    const classes = useStyle();
    const faktr_underwriting_allowance = useSelector((state) => state.account.chainData.faktr_underwriting_allowance)
    const faktr_balance = useSelector((state) => state.account.chainData.faktr_balance)
    const fakt_staked_balance = useSelector((state) => state.account.chainData.fakt_staked_balance)
    const underwritings = useSelector(state => state.account.chainData.underwritings)

    return (
        <React.Fragment>
            <Grid container spacing={3} mb={3}>
                <Grid container item xs={12} md={8} spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer className={classes.table}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>PROJECT</TableCell>
                                        <TableCell>ADD</TableCell>
                                        <TableCell>MY STAKE</TableCell>
                                        <TableCell>OPTION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        selectedItems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', pl: '20px' }}>
                                                        <img
                                                            src={config.API_SERVER + (protocols.filter(protocol => protocol.product_id === item.product_id))[0]?.logo}
                                                            style={{ width: '24px', height: '24px', marginRight: '10px' }}
                                                            alt='logo'
                                                        />
                                                        {(protocols.filter(protocol => protocol.product_id === item.product_id))[0]?.name}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <OutlinedInput
                                                        type='number'
                                                        endAdornment={<InputAdornment position='end'>FAKTR</InputAdornment>}
                                                        inputProps={{ min: 0 }}
                                                        value={item.amount}
                                                        sx={{ minWidth: '200px' }}
                                                        onChange={(e) => setSelectedItems(e, item)}
                                                    >

                                                    </OutlinedInput>
                                                </TableCell>
                                                <TableCell>
                                                    {(() => {
                                                        let stakingDetail = (underwritings.filter(underwriting => underwriting.productId === item.product_id))[0];
                                                        if (stakingDetail)
                                                            if (stakingDetail.amount === null)
                                                                return 0;
                                                            else
                                                                return trim(stakingDetail.amount, 2);
                                                        return 0;
                                                    })()} FAKTR
                                                </TableCell>
                                                <TableCell>
                                                    <Button className={classes.removeButton} onClick={() => onClickRemove(item.product_id)}>
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Button
                                                sx={{ color: 'common.main' }}
                                                onClick={onClickAddProject}
                                            >
                                                Add more project
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <Typography variant='h4' sx={{ mb: 1 }}>Lock up</Typography>
                            <Typography>If you unstake from a project you will enter a 30 day lock up period. During this time you will continue to receive FAKTR rewards (but not shield mining incentive rewards) and can still lose some (or all) of your deposit if a successful claim is made.</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <Typography variant='h4' sx={{ mb: 1 }}>Risk</Typography>
                            <Typography>When staking FAKTR, you are exposing yourself to risk. If a claim is paid on a project you staked on, you could lose your deposit.</Typography>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={classes.card} sx={{ position: 'sticky', top: '100px' }}>
                        <Typography variant='h4' sx={{ mb: 2 }}>Agreement</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>FAKTR Balance:</Typography>
                            <Typography>{trim(faktr_balance, 2)} FAKTR</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>Staked Balance:</Typography>
                            <Typography>{trim(fakt_staked_balance, 2)} FAKTR</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>Stake Amount:</Typography>
                            <Typography>{selectedItems.reduce((pre, cur) => (pre + Number(cur.amount)), 0)} FAKTR</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Checkbox
                                checked={confirmRisk}
                                onClick={(e) => onClickConfirmRisk(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                className={classes.checkBox}
                            />
                            <Typography>
                                I agree to the lock up period and risks.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                className={classes.confirmButton}
                                onClick={next}
                            >
                                {faktr_underwriting_allowance ? 'Confirm' : 'Approve'}
                            </Button>
                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </React.Fragment>
    )
}

export default DepositView;