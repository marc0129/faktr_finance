// action - state management
import { FETCH_PRODUCTS_LIST, FETCH_APP_STATS, FETCH_NATIVE_TOKEN } from './actions';

export const initialState = {
    products: [],
    stats: {
        activeCoverAmount: {
            ETH: 0,
            USDT: 0
        },
        totalStakedAmount: 0,
        faktrPrice: {
            FAKTR: {
                FAKTR: 0, NATIVE: 0, USDT: 0
            },
            USDT: {
                USDT: 0, NATIVE: 0, FAKTR: 0
            },
            NATIVE: {
                USDT: 0, NATIVE: 0, FAKTR: 0
            }
        }
    },
    nativeToken: 'ETH'
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_LIST: {
            const { products } = action.payload;
            return {
                ...state,
                products
            }
        }
        case FETCH_APP_STATS: {
            const { stats } = action.payload;
            return {
                ...state,
                stats
            }
        }
        case FETCH_NATIVE_TOKEN: {
            const { nativeToken } = action.payload;
            return {
                ...state,
                nativeToken
            }
        }
        default: {
            return { ...state };
        }
    }
};

export default appReducer;
