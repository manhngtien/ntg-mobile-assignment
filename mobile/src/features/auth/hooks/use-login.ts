import { useCallback } from 'react';
import { loginUser, logout, selectUser, selectAccessToken, selectLoading } from '../auth-slice';
import { LoginRequest } from '../types';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

export const useLogin = () => {
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
