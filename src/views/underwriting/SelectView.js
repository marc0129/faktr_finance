import React from 'react';
import ProtocolCard from './ProtocolCard';
import { Box } from '@material-ui/system';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { IconX } from '@tabler/icons';
import config from '../../config';


const useStyles = makeStyles((theme) => ({
    searchControl: {

    },
    selectBox: {
        width: '100%',
        height: 'fit-content',
        // minHeight: '200px',
        border: `1px solid ${theme.palette.common.mainLight}`,
        position: 'sticky',
        top: '100px'
    },
    continueButton: {
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
    removeButton: {

        color: theme.palette.grey[400],
        background: theme.palette.common.paper,
        '&:hover': {
            color: theme.palette.common.main
        }
    },
    buttonGroup: {
        '& .MuiToggleButton-root': {
            color: theme.palette.orange.dark,
            fontWeight: 'bold',
            borderColor: theme.palette.orange.light,
            borderRadius: '15px',
            width: '150px',
            '&:hover': {
                borderColor: theme.palette.orange.light,
                backgroundColor: theme.palette.orange.main,
                color: '#fff'
            },
            '&.Mui-selected': {
                borderColor: theme.palette.orange.light,
                backgroundColor: theme.palette.orange.main,
                color: '#fff'
            }
        }
    }
}));

const SelectView = ({ protocols, selectedItems, next, onClickSelect, onClickRemove }) => {

    const classes = useStyles();


    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid container spacing={2} item xs={12} md={8}>
                    {
                        protocols?.map((protocol, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                                <ProtocolCard
                                    title={protocol.name}
                                    icon={config.API_SERVER + protocol.logo}
                                    staked={protocol.total_staked}
                                    apy={protocol.apy}
                                    disable={(selectedItems.find(item => item.product_id === protocol.product_id) !== undefined) ? true : false}
                                    onClickSelect={() => onClickSelect(protocol.product_id)}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container item xs={12} md={4}>
                    <Paper className={classes.selectBox} >
                        <Grid container direction='column' justifyContent='space-between' sx={{ height: '100%' }}>
                            <Grid item>
                                <Box sx={{ p: '20px' }}>
                                    <Box>
                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2, color: '#666' }}>Selected</Typography>
                                    </Box>
                                    {selectedItems.length === 0 ?
                                        <Box sx={{ mb: 3 }}>
                                            <Typography sx={{ fontSize: '16px' }} variant='body2'>- Please select the projects to continue</Typography>
                                        </Box> :
                                        <Box sx={{ mb: 3 }}>
                                            {
                                                selectedItems?.map((item) => (
                                                    <Box key={item.product_id} display='flex' alignItems='center' sx={{ px: 1, py: 1.5 }}>
                                                        <img src={config.API_SERVER + (protocols.filter(protocol => protocol.product_id === item.product_id))[0]?.logo} alt='logo' style={{ width: '24px', height: '24px' }} />
                                                        <Typography sx={{ fontSize: '18px', mx: 3, color: '#666' }}>{(protocols.filter(protocol => protocol.product_id === item.product_id))[0]?.name}</Typography>
                                                        <Box sx={{ flexGrow: 1 }}></Box>
                                                        <Button className={classes.removeButton} onClick={() => onClickRemove(item.product_id)}><IconX /></Button>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    }
                                </Box>

                            </Grid>

                            <Grid item display='flex' justifyContent='center'>
                                <Button className={classes.continueButton} onClick={next}>Continue</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid >
        </React.Fragment >
    )
}

SelectView.propTypes = {
    next: PropTypes.func,
    handleClickSelect: PropTypes.func
}

export default SelectView;