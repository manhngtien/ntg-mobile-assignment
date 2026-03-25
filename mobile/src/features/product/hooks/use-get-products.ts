import { useCallback } from 'react';
import { fetchProducts, selectProducts, selectProductsLoading, selectProductsError } from '../product-slice';
import { selectAccessToken } from '../../auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAccessToken);
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const getProducts = useCallback(() => {
    if (token) {
      dispatch(fetchProducts(token));
    }
  }, [dispatch, token]);

  return { products, loading, error, getProducts };
};
