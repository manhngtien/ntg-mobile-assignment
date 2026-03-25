import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse, LoginRequest } from './types';
import { User } from '../../models/user';
import { authService } from '../../services/apis/auth-service';
import { secureStorageService } from '../../services/secure-storage-service';

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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await secureStorageService.removeToken();
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
