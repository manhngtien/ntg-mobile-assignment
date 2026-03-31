import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { selectLoading, selectUser } from '../auth-slice';
import { loginUser, logoutUser } from '../auth-thunk';
import { LoginRequest } from '../types';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);

  const login = useCallback(
    (credentials: LoginRequest) => {
      dispatch(loginUser(credentials));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return { user, loading, login, logout };
};
