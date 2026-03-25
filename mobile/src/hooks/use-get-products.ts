import { useCallback } from 'react';
import { fetchProducts, selectProducts, selectProductsLoading, selectProductsError } from '../slices/product-slice';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { selectAccessToken } from '../slices/auth-slice';

const useGetProducts = () => {
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

export default useGetProducts;
