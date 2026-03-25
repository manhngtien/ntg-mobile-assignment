import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, LoginRequest } from './types';
import { User } from '../../models/user';
import { authService } from '../../services/apis/auth-service';
import { secureStorageService } from '../../services/secure-storage-service';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  isLoginSuccess: boolean | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: null,
  isLoginSuccess: null
};

export const loginUser = createAsyncThunk<LoginResponse['data'], LoginRequest>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      // Save token to secure storage
      if (response.data?.token) {
        await secureStorageService.saveToken(response.data.token);
      }
      return response.data;
    } catch {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

export const initializeAuth = createAsyncThunk<User | null, void>(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = await secureStorageService.loadToken();
      if (token) {
        const response = await authService.getUser(token);
        return response.data;
      }
      return null;
    } catch {
      // Token is invalid or expired, remove it
      await secureStorageService.removeToken();
      return null;
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
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isLoginSuccess = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = null;
      state.isLoginSuccess = null;
      secureStorageService.removeToken();
    }
  },
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
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoginSuccess = (state: { auth: AuthState }) => state.auth.isLoginSuccess;

// Login-specific selectors (for backward compatibility)
export const selectLoginUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
