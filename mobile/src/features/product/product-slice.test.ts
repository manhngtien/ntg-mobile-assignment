const makeActionCreator = (type: string) => {
  const creator: any = (payload: any, _requestId?: string, arg?: any) => ({
    type,
    payload,
    meta: { arg, requestId: _requestId ?? '' },
  });
  creator.type = type;
  return creator;
};

jest.mock('./product-thunk', () => ({
  fetchProducts: Object.assign(jest.fn(), {
    pending: makeActionCreator('product/fetchProducts/pending'),
    fulfilled: makeActionCreator('product/fetchProducts/fulfilled'),
    rejected: makeActionCreator('product/fetchProducts/rejected'),
  }),
}));

jest.mock('react-native', () => ({
  ToastAndroid: { show: jest.fn() },
}));

import productReducer, {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from './product-slice';
import { fetchProducts } from './product-thunk';
import { ToastAndroid } from 'react-native';

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones',
    image: 'https://example.com/headphones.jpg',
    price: 199.99,
    priceUnit: 'USD',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans',
    image: 'https://example.com/coffee.jpg',
    price: 24.99,
    priceUnit: 'USD',
    createdAt: '2024-02-20T14:30:00Z',
    updatedAt: '2024-02-20T14:30:00Z',
    category: 'Food & Beverage',
  },
];

describe('productSlice', () => {
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetchProducts', () => {
    it('should set loading to true and clear error on pending', () => {
      const prevState = { ...initialState, error: 'previous error' };
      const state = productReducer(prevState, fetchProducts.pending('', { category: 'Electronics' }));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set products on fulfilled', () => {
      const state = productReducer(initialState, fetchProducts.fulfilled(mockProducts, '', { category: 'Electronics' }));
      expect(state.loading).toBe(false);
      expect(state.products).toEqual(mockProducts);
    });

    it('should set error and show toast on rejected', () => {
      const state = productReducer(initialState, fetchProducts.rejected(Error(''), '', { category: 'Electronics' }));
      expect(state.loading).toBe(false);
      expect(state.error).toBe('');
      expect(ToastAndroid.show).toHaveBeenCalledWith('Failed to fetch products. Please try again.', ToastAndroid.LONG);
    });

    it('should set error from rejectWithValue on rejected', () => {
      const state = productReducer(
        initialState,
        fetchProducts.rejected(Error('Failed to fetch products. Please try again.'), '', { category: 'Electronics' })
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch products. Please try again.');
    });
  });

  describe('selectors', () => {
    const mockState = {
      product: {
        products: mockProducts,
        loading: true,
        error: 'Something went wrong',
      },
    };

    it('selectProducts should return products', () => {
      expect(selectProducts(mockState)).toEqual(mockProducts);
    });

    it('selectProductsLoading should return loading', () => {
      expect(selectProductsLoading(mockState)).toBe(true);
    });

    it('selectProductsError should return error', () => {
      expect(selectProductsError(mockState)).toBe('Something went wrong');
    });
  });
});
