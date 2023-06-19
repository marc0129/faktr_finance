import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import eth from '../../assets/images/icons/eth.jpg';
import polygon from '../../assets/images/icons/polygon.svg'
import { trim } from '../../helpers/trim';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '260px',
        border: `1px solid ${theme.palette.common.mainLight}`,
        overflow: 'hidden',
        boxShadow: '1px 1px 0.5px #eee',
        '& .MuiTypography-root': {
            fontSize: '15px',
            fontWeight: 600,
            color: '#666'
        },
        '&:hover': {
            borderColor: theme.palette.common.mainLight
        }
    },
    quoteButton: {
        width: '100%',
        height: '46px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
        color: theme.palette.common.main,
        background: theme.palette.common.mainLight,
        '&:hover': {
            background: theme.palette.common.main,
            color: '#FFF'

        }
    }
}))

const QuoteCard = ({ id, title, icon, cost, capacity, next, onClickQuote }) => {

    const classes = useStyles();
    const tokenText = useSelector(state => state.app.nativeToken);

    return (
        <React.Fragment>
            <Paper className={classes.card}>
                <Box px={3} sx={{ height: '75%' }}>
                    <Grid container direction='column' justifyContent="space-around" sx={{ height: '100%', paddingTop: '20px' }}>
                        <Grid item>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItem: 'center'
                                }}
                            >
                                <img src={icon} alt='logo' style={{ width: '30px', height: '30px' }} />
                                <Typography sx={{ px: 3, fontSize: '17px !important' }} >{title}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '10px' }}>
                                <Typography>Chains:</Typography>
                                <Box>
                                    <img src={eth} style={{ width: '24px', heigth: '24px', marginRight: '5px' }} alt='eth' />
                                    <img src={polygon} style={{ width: '24px', heigth: '24px' }} alt='polygon' />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '15px' }}>
                                <Typography>Yearly Cost:</Typography>
                                <Typography>{cost}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '10px' }}>
                                <Typography>Capacity:</Typography>
                                <Typography sx={{ whiteSpace: 'nowrap' }}>
                                    {(capacity.ETH >= 1000 ?
                                        trim(capacity.ETH / 1000, 2) + 'k ' + tokenText : trim(capacity.ETH, 2) + ' ' + tokenText) +
                                        (capacity.USDT >= 1000 ? '/' + trim(capacity.USDT / 1000, 2) + 'k USDT' :
                                            + '/' + trim(capacity.USDT, 2) + 'USDT')
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>


                <Box>
                    <Button
                        className={classes.quoteButton}
                        onClick={() => {
                            onClickQuote(id);
                            next();
                        }}>
                        Get Quote
                    </Button>
                </Box>
            </Paper>
        </React.Fragment>
    )
}

QuoteCard.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    cost: PropTypes.string,
    capacity: PropTypes.object
}

export default QuoteCard;