import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import {
    lightTheme as rainbowLightTheme,
    RainbowKitProvider
} from "@rainbow-me/rainbowkit";
import { chains } from './hooks/wagmi';
// routing
import Routes from './routes';

// defaultTheme
import theme from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import { useAccount, useNetwork, useProvider } from 'wagmi';
import { useEffect } from 'react';
import { useWeb3Function } from './hooks/useWeb3Function';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import config from './config';
import { FETCH_PRODUCTS_LIST, FETCH_APP_STATS, FETCH_NATIVE_TOKEN } from './store/actions';

//-----------------------|| APP ||-----------------------//

const App = () => {

    const customization = useSelector((state) => state.customization);
    const { chain } = useNetwork();
    const { address, isConnected } = useAccount();
    const { getUserInfo } = useWeb3Function();
    const provider = useProvider();
    const dispatch = useDispatch();
    const test = useSelector(state => state.account.chainData.covers)

    useEffect(() => {
        if (isConnected && chain.id === 80001) {
            getUserInfo(address, chain.id, provider);
        }
    }, [address, isConnected, provider]);

    useEffect(() => {
        const api = axios.create({
            baseURL: config.API_SERVER
        });
        api.get('api/products')
            .then(function (res) {
                dispatch({ type: FETCH_PRODUCTS_LIST, payload: { products: res.data.data } });
            })
    }, []);

    useEffect(() => {
        if (isConnected && chain) {
            const api = axios.create({
                baseURL: config.API_SERVER
            });
            dispatch({ type: FETCH_NATIVE_TOKEN, payload: { nativeToken: chain.nativeCurrency.symbol } })
            api.post('api/products/stats', { chainId: chain.id })
                .then(function (res) {
                    dispatch({ type: FETCH_APP_STATS, payload: { stats: res.data.data } });
                })
        }
    }, [isConnected, chain])

    return (
        <StyledEngineProvider injectFirst>
            <RainbowKitProvider
                appInfo={{
                    appName: 'faktr.finance'
                }}
                chains={chains}
                theme={
                    rainbowLightTheme({ accentColor: "#E0E2E3", accentColorForeground: "#181A1D" })
                }
            >
                <ThemeProvider theme={theme(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <ToastContainer autoClose={3000} limit={3} />
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </RainbowKitProvider>
        </StyledEngineProvider>
    );
};

export default App;
