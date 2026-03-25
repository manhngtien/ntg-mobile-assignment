import { useCallback } from 'react';
import { loginUser, logout, selectUser, selectAccessToken, selectLoading } from '../slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { LoginRequest } from '../types/requests/login-requests';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectAccessToken);
  const loading = useAppSelector(selectLoading);

  const login = useCallback((credentials: LoginRequest) => {
    dispatch(loginUser(credentials));
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return { user, token, loading, login, logout: logoutUser };
};

export default useLogin;
