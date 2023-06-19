import React, { useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Tabs, Tab, Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ClaimListTable from './ClaimListTable';
import AssessmentTable from './AssessmentTable';
import Stake from './Stake';

const cardTitle = 'Earn rewards by becoming Faktr finance claim accessor';

const useStyle = makeStyles((theme) => ({
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
        minHeight: '70vh',
        border: `1px solid ${theme.palette.common.mainLight}`,
        backgroundColor: theme.palette.common.paper,
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px'
    },
    helpButton: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        marginRight: '30px',
        padding: '10px',
        fontWeight: 'bold',
        backgroundColor: theme.palette.common.main,
        color: '#fff',
        borderRadius: '15px',
        height: '40px',
        '&:hover': {
            backgroundColor: theme.palette.common.main
        }
    }
}));

const Claim = () => {

    const [tabValue, setTabValue] = useState('stake');

    const classes = useStyle();

    return (
        <MainCard title={cardTitle} sx={{ minHeight: '88vh' }}>
            <Grid container>
                <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
                    <Tabs
                        value={tabValue}
                        onChange={(evt, value) => setTabValue(value)}
                        className={classes.tabs}
                    >
                        <Tab label='Claims' disableRipple value='claims' />
                        <Tab label='Assessments' disableRipple value='assessment' />
                        <Tab label='Stake' disableRipple value='stake' />
                    </Tabs>
                    <Button className={classes.helpButton}>Request Claim</Button>
                </Grid>
                <Grid item xs={12}>
                    <Box className={classes.tabContentBox}>
                        {(() => {
                            if (tabValue === 'claims')
                                return (
                                    <ClaimListTable />
                                )
                            else if (tabValue === 'assessment')
                                return (
                                    <AssessmentTable />
                                )
                            else if (tabValue === 'stake')
                                return (
                                    <Stake />
                                )
                        })()}
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Claim;