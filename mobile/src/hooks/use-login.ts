import { useCallback } from 'react';
import { loginUser, logout, selectLoginUser, selectLoginAccessToken } from '../slices/login-slice';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { LoginRequest } from '../types/requests/login-requests';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectLoginUser);
  const token = useAppSelector(selectLoginAccessToken);
  const loading = useAppSelector(state => state.login.loading);

  const login = useCallback((credentials: LoginRequest) => {
    dispatch(loginUser(credentials));
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return { user, token, loading, login, logout: logoutUser };
};

export default useLogin;