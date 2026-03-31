import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from '../product-slice';
import { fetchProductById } from '../product-thunk';

export const useGetProductById = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const getProductById = useCallback(
    (id: number) => {
      dispatch(fetchProductById(id));
    },
    [dispatch],
  );

  return { selectedProduct, loading, error, getProductById };
};
