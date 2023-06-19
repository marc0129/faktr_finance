import React, { useState } from 'react';
import QuoteCard from './QuoteCard';
import { IconSearch } from '@tabler/icons';
import { Grid, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';
import { trim } from '../../helpers/trim';
import config from '../../config';


const CardsView = ({ protocols, next, onClickQuote }) => {

    const [value, setValue] = useState('');

    return (
        <React.Fragment>
            <Grid container sx={{ mb: 3 }} alignItems='center'>
                <Typography sx={{ mx: 3, fontSize: '20px', color: '#666', display: { xs: 'none', sm: 'block' } }}>Search:</Typography>
                <OutlinedInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    startAdornment={
                        <InputAdornment position='start'>
                            <IconSearch stroke={1.5} size="1.2rem" />
                        </InputAdornment>
                    }
                >
                </OutlinedInput>
            </Grid>
            <Grid container spacing={2}>
                {
                    protocols?.filter((protocol) => protocol.name.toLowerCase().includes(value.toLowerCase())).map((protocol, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <QuoteCard
                                id={index}
                                title={protocol.name}
                                icon={config.API_SERVER + protocol.logo}
                                cost={trim(protocol.yearly_cost * 100, 2) + '%'}
                                capacity={protocol.capacity}
                                next={next}
                                onClickQuote={onClickQuote}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </React.Fragment>
    )
}

export default CardsView;