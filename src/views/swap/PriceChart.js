import React from 'react'
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { Grid, Card, useTheme, Typography, ToggleButton, ToggleButtonGroup, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/system';
// import eth from '../../assets/images/icons/ethereum.svg';
// import matic from '../../assets/images/icons/polygon.svg';
// import faktr from '../../assets/images/icons/icon2.svg';


const chartData = {
    type: 'area',
    height: 450,
    width: '100%',
    options: {
        chart: {
            id: 'price-chart',
            sparkline: {
                enabled: true
            }
        },
        xaxis: {
            categories: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7']
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: true
            },
            y: {
                title: {
                    formatter: () => 'Price: '
                }
            },
            marker: {
                show: false
            }
        },
        stroke: {
            width: 1
        }
    },
    series: [
        {
            data: [0, 15, 10, 50, 30, 40, 25]
        }
    ]
};

const useStyle = makeStyles((theme) => ({
    card: {
        backgroundColor: '#FFF4FF'
        // border: `1px solid ${theme.palette.common.mainLight}`
    },
    avatar: {
        width: '30px',
        height: '30px',
        backgroundColor: 'transparent',
        '& img': {
            width: '30px',
            height: '30px',
            margin: 0,
            padding: 0
        }
    },
    buttonGroup: {
        '& .MuiToggleButton-root': {
            color: theme.palette.orange.dark,
            fontWeight: 'bold',
            borderColor: theme.palette.orange.main,
            borderRadius: '15px',
            width: '60px',
            '&:hover': {
                borderColor: theme.palette.orange.main,
                backgroundColor: theme.palette.orange.main,
                color: '#fff'
            },
            '&.Mui-selected': {
                borderColor: theme.palette.orange.main,
                backgroundColor: theme.palette.orange.main,
                color: '#fff'
            }
        }
    }
}))

const PriceChart = () => {

    const classes = useStyle();
    const theme = useTheme();

    const [priceInterval, setInterval] = React.useState('24h');

    const orangeDark = theme.palette.orange.dark;

    const setPriceInterval = (evt, value) => {
        console.log(value)
        setInterval(value);
    }

    React.useEffect(() => {
        const priceChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`price-chart`, 'updateOptions', priceChart);
    }, [orangeDark])

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <Grid container direction='column'>
                    {/* <Grid item display='flex' alignItems='center'>
                        <Box display='flex' p={3}>
                            <Avatar variant='rounded' className={classes.avatar}>
                                <img src={eth} alt='eth' />
                            </Avatar>
                            <Avatar variant='rounded' className={classes.avatar}>
                                <img src={faktr} alt='matic' />
                            </Avatar>
                        </Box>
                        <Box>
                            <Typography sx={{ color: 'orange.main', fontSize: '20px' }}>ETH/Faktr</Typography>
                        </Box>
                    </Grid> */}
                    <Grid item >
                        <Box display='flex' alignItems='center' p={2}>
                            <Typography sx={{ color: 'orange.dark', fontSize: '32px', fontWeight: 900, px: 1 }}>0.02</Typography>
                            <Typography sx={{ color: 'orange.dark', fontSize: '18px', fontWeight: 'bold', pt: 1 }}>ETH/Faktr</Typography>
                            <Typography sx={{ color: 'orange.dark', fontSize: '18px', fontWeight: 'bold', pt: 1, px: 2 }}> +0.002 (4.11%)</Typography>
                            <Divider variant='middle' />
                        </Box>
                    </Grid>
                    <Grid item display='flex' justifyContent='flex-end' px={2} mb={2}>
                        <ToggleButtonGroup
                            variant='outlined'
                            value={priceInterval}
                            className={classes.buttonGroup}
                            exclusive
                            onChange={setPriceInterval}
                        >
                            <ToggleButton value='24h'>24H</ToggleButton>
                            <ToggleButton value='1w'>1W</ToggleButton>
                            <ToggleButton value='1m'>1M</ToggleButton>
                            <ToggleButton value='1y'>1Y</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item>
                        <Chart {...chartData} />
                    </Grid>
                </Grid>
            </Card>
        </React.Fragment>
    )
}

export default PriceChart;