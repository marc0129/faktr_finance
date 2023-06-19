import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import eth from '../../assets/images/icons/eth.jpg';
import polygon from '../../assets/images/icons/polygon.svg'
import { trim } from '../../helpers/trim';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '260px',
        border: `1px solid ${theme.palette.common.mainLight}`,
        // boxShadow: '1px 1px 0.5px #eee',
        '& .MuiTypography-root': {
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#666'
        },
        '&:hover': {
            border: `1px solid ${theme.palette.common.mainLight}`
        }
    },
    selectButton: {
        width: '100%',
        height: '46px',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
        fontSize: '16px',
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: theme.palette.common.main,
        background: theme.palette.common.mainLight,
        '&:hover': {
            background: theme.palette.common.main,
            color: '#FFF'
        }
    }
}))

const ProtocolCard = ({ title, icon, staked, apy, onClickSelect, disable }) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Paper className={classes.card}>
                <Box sx={{ padding: '20px', height: '80%' }}>
                    <Grid container direction='column' justifyContent="space-around" sx={{ height: '100%' }}>
                        <Grid item >
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
                                <Typography>Staked:</Typography>
                                <Typography>{trim(staked, 2)} FAKTR</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '10px' }}>
                                <Typography>APY:</Typography>
                                <Typography>{apy}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className={classes.selectButton} disabled={disable} onClick={onClickSelect}>Select</Button>
                </Box>
            </Paper>
        </React.Fragment >
    )
}

ProtocolCard.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    cost: PropTypes.string,
    capacity: PropTypes.string
}

export default ProtocolCard;