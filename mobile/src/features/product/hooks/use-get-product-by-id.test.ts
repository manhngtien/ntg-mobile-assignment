import { act, renderHook } from '@testing-library/react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchProductById } from '../product-thunk';
import { useGetProductById } from './use-get-product-by-id';

jest.mock('../../../redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../product-thunk', () => ({
  fetchProductById: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockFetchProductById = fetchProductById as jest.MockedFunction<typeof fetchProductById>;
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

const mockProduct = {
  id: 1,
  name: 'Wireless Headphones',
  description: 'High-quality wireless headphones',
  image: 'https://example.com/headphones.jpg',
  price: 199.99,
  priceUnit: 'USD',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  category: 'Electronics',
};

describe('useGetProductById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockReturnValue({ unwrap: jest.fn() });
  });

  const setupSelector = (
    overrides: {
      selectedProduct?: typeof mockProduct | null;
      loading?: boolean;
      error?: string | null;
    } = {},
  ) => {
    const selectedProduct = overrides.selectedProduct ?? null;
    const loading = overrides.loading ?? false;
    const error = overrides.error ?? null;

    mockUseAppSelector.mockImplementation((selector) => {
      const state = { product: { selectedProduct, loading, error } } as any;
      return selector(state);
    });

    return { selectedProduct, loading, error };
  };

  it('should return selectedProduct from the store', () => {
    setupSelector({ selectedProduct: mockProduct });
    const { result } = renderHook(() => useGetProductById());

    expect(result.current.selectedProduct).toEqual(mockProduct);
  });

  it('should return null selectedProduct when not set', () => {
    setupSelector();
    const { result } = renderHook(() => useGetProductById());

    expect(result.current.selectedProduct).toBeNull();
  });

  it('should return loading state from the store', () => {
    setupSelector({ loading: true });
    const { result } = renderHook(() => useGetProductById());

    expect(result.current.loading).toBe(true);
  });

  it('should return error from the store', () => {
    setupSelector({ error: 'Something went wrong' });
    const { result } = renderHook(() => useGetProductById());

    expect(result.current.error).toBe('Something went wrong');
  });

  it('should call dispatch with fetchProductById when getProductById is called', () => {
    setupSelector();
    const { result } = renderHook(() => useGetProductById());

    act(() => {
      result.current.getProductById(1);
    });

    expect(mockFetchProductById).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should return stable getProductById reference across re-renders', () => {
    setupSelector();
    const { result, rerender } = renderHook(() => useGetProductById());

    const firstGetProductById = result.current.getProductById;
    rerender({});

    expect(result.current.getProductById).toBe(firstGetProductById);
  });
});
