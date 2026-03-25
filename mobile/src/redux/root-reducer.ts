import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import productReducer from '../features/product/product-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
