import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../thunks/app-thunk';
import { apiService } from '../services/api-service';
import { User } from '../models/user';
import { LoginResponse } from '../types/responses/login-responses';
import { LoginRequest } from '../types/requests/login-requests';
import { ToastAndroid } from 'react-native';

interface LoginState {
  user: User | null;
  token: string | null;
  loading: boolean;
  success: boolean | null;
}

const initialState: LoginState = {
  user: null,
  token: null,
  loading: false,
  success: null
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse['data']>) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload!.user;
      state.token = action.payload!.token;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginSlice.actions;

export const loginUser = (credentials: LoginRequest): AppThunk => async (dispatch) => {
  dispatch(loginStart());

  try {
    const response = await apiService.login(credentials);
    dispatch(loginSuccess(response.data));
  }
  catch {
    dispatch(loginFailure());
    ToastAndroid.show("Login failed. Please try again.", ToastAndroid.LONG);
  }
};

export const selectLoginUser = (state: { login: LoginState }) => state.login.user;
export const selectLoginAccessToken = (state: { login: LoginState }) => state.login.token;
export const selectLoginLoading = (state: { login: LoginState }) => state.login.loading;

export default loginSlice.reducer;
