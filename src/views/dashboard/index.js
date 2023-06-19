import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Tabs, Tab, Box } from '@material-ui/core';
import CoverTable from './CoverList';
import UnderwritingTable from './UnderwritingList';
import ClaimTable from './ClaimList';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNetwork } from 'wagmi';

const cardTitle = 'Welcome to faktr finance.';

const useStyles = makeStyles((theme) => ({
    dashboard: {
        marginBottom: '30px',
        '& .MuiCard-root': {
            minHeight: '200px',
            padding: '20px',
            backgroundColor: '#fff',
            border: `1px solid ${theme.palette.common.mainLight}`
        }
    },
    tabs: {
        '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: '16px',
            color: '#666',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            border: `1px solid ${theme.palette.common.mainLight}`,
            backgroundColor: theme.palette.common.paper
        },
        '& .MuiTab-root.Mui-selected': {
            padding: '20px',
            fontWeight: 'bold',
            color: '#666',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            border: `1px solid ${theme.palette.common.mainLight}`,
            borderTop: `4px solid ${theme.palette.common.main}`,
            backgroundColor: theme.palette.common.paper
        },
        '& .MuiTabs-indicator': {
            backgroundColor: '#fff'
        }
    },
    tabContentBox: {
        marginTop: '-2px',
        minHeight: '50vh',
        border: `1px solid ${theme.palette.common.mainLight}`,
        backgroundColor: theme.palette.common.paper,
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px'
    }
}))

const Dashboard = () => {

    const classes = useStyles();
    const [tabValue, setTabValue] = useState('cover');
    const protocols = useSelector(state => state.app.products);
    const stats = useSelector(state => state.app.stats);
    const { chain } = useNetwork();


    return (
        <MainCard title={cardTitle} sx={{ minHeight: '85vh' }}>
            <Grid container spacing={2} className={classes.dashboard}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <Typography sx={{ fontSize: '20px', my: 1 }}>Fakt Token Price </Typography>
                        <Typography sx={{ fontSize: '20px', my: 1 }}>{ }</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <Typography sx={{ fontSize: '20px', my: 1 }}>Active Cover Policy Value</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <Typography sx={{ fontSize: '20px', my: 1 }}>Total Fakt Staked </Typography>
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
                    <Tabs
                        value={tabValue}
                        onChange={(evt, value) => setTabValue(value)}
                        className={classes.tabs}
                    >
                        <Tab label='Covers' disableRipple value='cover' />
                        <Tab label='Underwriting' disableRipple value='underwriting' />
                        <Tab label='Claims' disableRipple value='claim' />
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    <Box className={classes.tabContentBox}>
                        {(() => {
                            if (tabValue === 'cover')
                                return (
                                    <CoverTable protocols={protocols} />
                                )
                            else if (tabValue === 'underwriting')
                                return (
                                    <UnderwritingTable protocols={protocols} />
                                )
                            else if (tabValue === 'claim')
                                return (
                                    <ClaimTable />
                                )
                        })()}
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Dashboard;