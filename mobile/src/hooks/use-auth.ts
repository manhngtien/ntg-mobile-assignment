import { useCallback } from 'react';
import { selectIsAuthenticated, fetchProfile, selectProfileUser, selectProfileLoading } from '../slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { selectLoginAccessToken } from '../slices/login-slice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectProfileUser);
  const loading = useAppSelector(selectProfileLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectLoginAccessToken);

  const fetchAuthUser = useCallback(() => {
    dispatch(fetchProfile(token!));
  }, [dispatch]);

  return { user, loading, isAuthenticated, fetchAuthUser };
};

export default useAuth;
