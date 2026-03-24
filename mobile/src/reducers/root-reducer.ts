import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from '../slices/api-slice';
import loginReducer from '../slices/login-slice';
import authReducer from '../slices/auth-slice';

const rootReducer = combineReducers({
    api: apiReducer,
    login: loginReducer,
    auth: authReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
