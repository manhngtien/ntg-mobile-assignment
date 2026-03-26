import { useCallback, useMemo } from 'react';
import { selectProducts, selectProductsLoading, selectProductsError } from '../product-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchProducts } from '../product-thunk';

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const categories = useMemo(() => products.map((product) => product.category), [products]);

  const getProducts = useCallback((category: string) => {
    dispatch(fetchProducts({ category }));
  }, [dispatch]);

  return { products, categories, loading, error, getProducts };
};
