import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from '../slices/api-slice';
import loginReducer from '../slices/login-slice';

const rootReducer = combineReducers({
    api: apiReducer,
    login: loginReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;