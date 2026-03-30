import { useCallback } from 'react';
import { selectSelectedProduct, selectProductsLoading, selectProductsError } from '../product-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchProductById } from '../product-thunk';

export const useGetProductById = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const getProductById = useCallback((id: number) => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

  return { selectedProduct, loading, error, getProductById };
};
