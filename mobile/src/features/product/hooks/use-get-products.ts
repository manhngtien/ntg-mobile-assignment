import { useCallback } from 'react';
import { selectProducts, selectProductsLoading, selectProductsError } from '../product-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchProducts } from '../product-thunk';

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const categories = products.map((product) => product.category);

  const getProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { products, categories, loading, error, getProducts };
};
