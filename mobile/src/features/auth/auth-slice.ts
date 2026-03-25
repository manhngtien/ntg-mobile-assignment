import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginResponse, LoginRequest } from './types';
import { ToastAndroid } from 'react-native';
import { User } from '../../models/user';
import { authService } from '../../services/auth-service';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  isLoginSuccess: boolean | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  isAuthenticated: null,
  isLoginSuccess: null
};

export const fetchProfile = createAsyncThunk<AuthResponse['data'], string>(
  'auth/fetchProfile',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await authService.getUser(accessToken);
      return response.data;
    } catch {
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

export const loginUser = createAsyncThunk<LoginResponse['data'], LoginRequest>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse['data']>) => {
      state.loading = false;
      state.isLoginSuccess = true;
      state.isAuthenticated = true;
      state.user = action.payload!.user;
      state.token = action.payload!.token;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isLoginSuccess = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = null;
      state.isLoginSuccess = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile cases
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<AuthResponse['data']>) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        ToastAndroid.show('Failed to fetch user data. Please log in.', ToastAndroid.LONG);
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
        state.token = action.payload!.token;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isLoginSuccess = false;
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.token;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoginSuccess = (state: { auth: AuthState }) => state.auth.isLoginSuccess;

// Login-specific selectors (for backward compatibility)
export const selectLoginUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoginAccessToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
