import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import appReducer from './appReducer';

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    account: accountReducer,
    app: appReducer,
    customization: customizationReducer
});

export default reducer;
