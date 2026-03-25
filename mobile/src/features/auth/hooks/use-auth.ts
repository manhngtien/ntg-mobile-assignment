import { useCallback } from 'react';
import { initializeAuth, selectIsAuthenticated, selectLoading, selectUser } from '../auth-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const fetchAuthUser = useCallback(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return { user, loading, isAuthenticated, fetchAuthUser };
};
