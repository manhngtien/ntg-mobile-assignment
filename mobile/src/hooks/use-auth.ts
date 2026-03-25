import { useCallback } from 'react';
import { selectIsAuthenticated, fetchProfile, selectLoading, selectUser, selectAccessToken } from '../slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../stores/store';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectAccessToken);

  const fetchAuthUser = useCallback(() => {
    dispatch(fetchProfile(token!));
  }, [dispatch]);

  return { user, loading, isAuthenticated, fetchAuthUser };
};

export default useAuth;
