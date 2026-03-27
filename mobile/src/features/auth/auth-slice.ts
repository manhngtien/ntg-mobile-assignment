import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from './types';
import { User } from '../../models/user';
import { loginUser, initializeAuth, logoutUser } from './auth-thunk';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  isLoginSuccess: boolean | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: null,
  isLoginSuccess: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // initializeAuth cases
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = 'Failed to initialize auth';
      })

      // loginUser cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse['data']>) => {
        state.loading = false;
        state.isLoginSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload!.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isLoginSuccess = false;
        state.isAuthenticated = false;
        state.error = 'Failed to login';
      })

      // logoutUser cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = null;
        state.isLoginSuccess = null;
      });
  }
});

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoginSuccess = (state: { auth: AuthState }) => state.auth.isLoginSuccess;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
