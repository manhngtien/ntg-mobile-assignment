import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { selectError, selectIsAuthenticated, selectLoading, selectUser } from '../auth-slice';
import { initializeAuth } from '../auth-thunk';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const error = useAppSelector(selectError);

  const fetchAuthUser = useCallback(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return { user, loading, error, isAuthenticated, fetchAuthUser };
};
