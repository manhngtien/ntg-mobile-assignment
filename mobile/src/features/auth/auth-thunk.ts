import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse, LoginRequest } from './types';
import { User } from '../../models/user';
import { authService } from '../../services/apis/auth-service';
import { secureStorageService } from '../../services/secure-storage-service';
import { databaseService } from '../../services/database-service';

export const loginUser = createAsyncThunk<LoginResponse['data'], LoginRequest>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (response.data?.token) {
        await secureStorageService.saveToken(response.data.token);
      }
      if (response.data?.user) {
        await databaseService.saveUser(response.data.user);
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
    await databaseService.deleteUser();
  }
);

export const initializeAuth = createAsyncThunk<User | null, void>(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUser();
      if (response.data) {
        await databaseService.saveUser(response.data);
      }
      return response.data;
    } catch {
      await secureStorageService.removeToken();
      return null;
    }
  }
);
