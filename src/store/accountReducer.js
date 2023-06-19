// action - state management
import { FETCH_CHAIN_DATA, SET_TRANSACTION } from './actions';

export const initialState = {

    isPendingTx: false,
    chainData: {
        faktr_balance: 0,
        fakt_staked_balance: 0,
        underwritings: [],
        underwriting_reward: 0,
        covers: [],
        faktr_purchase_allowance: false,
        faktr_underwriting_allowance: false,
        usdt_balance: 0,
        usdt_purchase_allowance: false
    }
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAIN_DATA: {
            const { chainData } = action.payload;
            return {
                ...state,
                chainData
            }
        }
        case SET_TRANSACTION: {
            const { txPending } = action.payload;
            return {
                ...state,
                isPendingTx: txPending
            }
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
