import { useCallback } from 'react';
import { fetchProducts, selectProducts, selectProductsLoading, selectProductsError } from '../product-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const getProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { products, loading, error, getProducts };
};
