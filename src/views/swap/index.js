import React from 'react';
import { Grid, Box } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import PriceChart from './PriceChart';
import SwapCard from './SwapCard';

const cardTitle = 'Swap ETH/DAI to Fakt'

const Swap = () => {

    return (
        <MainCard title={cardTitle} sx={{ minHeight: '85vh' }}>
            <Box sx={{ px: { xs: 1, md: 10 }, mt: 5 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <PriceChart />
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ px: { xs: 0, md: 2 } }}>
                        <SwapCard />
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    )
}

export default Swap;