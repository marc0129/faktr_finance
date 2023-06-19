import React from 'react';
import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import App from './App';

import { wagmiClient } from "./hooks/wagmi";
import { WagmiConfig } from "wagmi";

import config from './config';

// style + assets
import './assets/scss/style.scss';

//-----------------------|| REACT DOM RENDER  ||-----------------------//

ReactDOM.render(
    <WagmiConfig client={wagmiClient}>
        <Provider store={store}>
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
        </Provider>
    </WagmiConfig>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
