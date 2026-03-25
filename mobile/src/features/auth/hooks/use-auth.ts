import { useCallback } from 'react';
import { initializeAuth, selectAccessToken, selectIsAuthenticated, selectLoading, selectUser } from '../auth-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectAccessToken);

  const fetchAuthUser = useCallback(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return { user, loading, isAuthenticated, fetchAuthUser };
};
