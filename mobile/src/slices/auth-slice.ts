import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../thunks/app-thunk';
import { apiService } from '../services/api-service';
import { UserResponse } from '../types/responses/user-response';
import { AuthResponse } from '../types/responses/auth-response';
import { ToastAndroid } from 'react-native';

interface AuthState {
  userProfile: UserResponse | null;
  loading: boolean;
  isAuthenticated: boolean | null;
}

const initialState: AuthState = {
  userProfile: null,
  loading: false,
  isAuthenticated: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action: PayloadAction<AuthResponse['data']>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload;
    },
    fetchUserFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    }
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = authSlice.actions;

export const fetchProfile = (accessToken: string): AppThunk => async (dispatch) => {
  dispatch(fetchUserStart());

  try {
    const response = await apiService.getUser(accessToken);
    dispatch(fetchUserSuccess(response.data));
  }
  catch {
    dispatch(fetchUserFailure());
    ToastAndroid.show("Failed to fetch user data. Please log in.", ToastAndroid.LONG);
  }
};

export const selectProfileUser = (state: { auth: AuthState }) => state.auth.userProfile;
export const selectProfileLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export default authSlice.reducer;
