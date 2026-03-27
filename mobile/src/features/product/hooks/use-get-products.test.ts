import { renderHook, act } from '@testing-library/react-native';
import { useGetProducts } from './use-get-products';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchProducts } from '../product-thunk';
import { sampleProducts } from '../../../models/product';

jest.mock('../../../redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../product-thunk', () => ({
  fetchProducts: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockFetchProducts = fetchProducts as jest.MockedFunction<typeof fetchProducts>;
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('useGetProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockReturnValue({ unwrap: jest.fn() });
  });

  const setupSelector = (overrides: {
    products?: typeof sampleProducts;
    loading?: boolean;
    error?: string | null;
  } = {}) => {
    const products = overrides.products ?? sampleProducts;
    const loading = overrides.loading ?? false;
    const error = overrides.error ?? null;

    mockUseAppSelector.mockImplementation((selector) => {
      const state = { product: { products, loading, error } } as any;
      return selector(state);
    });

    return { products, loading, error };
  };

  it('should return products from the store', () => {
    const { products } = setupSelector();
    const { result } = renderHook(() => useGetProducts());

    expect(result.current.products).toEqual(products);
  });

  it('should return loading state from the store', () => {
    setupSelector({ loading: true });
    const { result } = renderHook(() => useGetProducts());

    expect(result.current.loading).toBe(true);
  });

  it('should return error from the store', () => {
    setupSelector({ error: 'Something went wrong' });
    const { result } = renderHook(() => useGetProducts());

    expect(result.current.error).toBe('Something went wrong');
  });

  it('should return categories derived from products', () => {
    setupSelector();
    const { result } = renderHook(() => useGetProducts());

    expect(result.current.categories).toEqual([
      'Electronics',
      'Food & Beverage',
      'Electronics',
    ]);
  });

  it('should return empty arrays when there are no products', () => {
    setupSelector({ products: [] });
    const { result } = renderHook(() => useGetProducts());

    expect(result.current.products).toEqual([]);
    expect(result.current.categories).toEqual([]);
  });

  it('should call dispatch with fetchProducts when getProducts is called', () => {
    setupSelector();
    const { result } = renderHook(() => useGetProducts());

    act(() => {
      result.current.getProducts('Electronics');
    });

    expect(mockFetchProducts).toHaveBeenCalledWith({ category: 'Electronics' });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should return stable categories reference on re-render with same products', () => {
    setupSelector();
    const { result, rerender } = renderHook(() => useGetProducts());

    const firstCategories = result.current.categories;
    rerender({});

    expect(result.current.categories).toBe(firstCategories);
  });

  it('should return stable getProducts reference across re-renders', () => {
    setupSelector();
    const { result, rerender } = renderHook(() => useGetProducts());

    const firstGetProducts = result.current.getProducts;
    rerender({});

    expect(result.current.getProducts).toBe(firstGetProducts);
  });
});
