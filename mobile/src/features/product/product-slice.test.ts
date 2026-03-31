const makeActionCreator = (type: string) => {
  const creator: any = (payload: any, _requestId?: string, arg?: any) => ({
    type,
    payload,
    meta: { arg, requestId: _requestId ?? '' },
  });
  creator.type = type;
  return creator;
};

const makeRejectedActionCreator = (type: string) => {
  const creator: any = (_error: any, _requestId?: string, arg?: any, payload?: any) => ({
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
    rejected: makeRejectedActionCreator('product/fetchProducts/rejected'),
  }),
  fetchProductById: Object.assign(jest.fn(), {
    pending: makeActionCreator('product/fetchProductById/pending'),
    fulfilled: makeActionCreator('product/fetchProductById/fulfilled'),
    rejected: makeRejectedActionCreator('product/fetchProductById/rejected'),
  }),
}));

jest.mock('react-native', () => ({
  ToastAndroid: { show: jest.fn() },
}));

import { ToastAndroid } from 'react-native';
import productReducer, {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from './product-slice';
import { fetchProductById, fetchProducts } from './product-thunk';

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
    selectedProduct: null,
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
      const state = productReducer(
        prevState,
        fetchProducts.pending('', { category: 'Electronics' }),
      );
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set products on fulfilled', () => {
      const state = productReducer(
        initialState,
        fetchProducts.fulfilled(mockProducts, '', { category: 'Electronics' }),
      );
      expect(state.loading).toBe(false);
      expect(state.products).toEqual(mockProducts);
    });

    it('should set error and show toast on rejected', () => {
      const state = productReducer(
        initialState,
        fetchProducts.rejected(new Error(''), '', { category: 'Electronics' }),
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        'Failed to fetch products. Please try again.',
        ToastAndroid.LONG,
      );
    });

    it('should set error from rejectWithValue on rejected', () => {
      const state = productReducer(
        initialState,
        fetchProducts.rejected(
          new Error(''),
          '',
          { category: 'Electronics' },
          'Failed to fetch products. Please try again.',
        ),
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch products. Please try again.');
    });
  });

  describe('fetchProductById', () => {
    it('should set loading to true, clear error and selectedProduct on pending', () => {
      const prevState = {
        ...initialState,
        error: 'previous error',
        selectedProduct: mockProducts[0],
      };
      const state = productReducer(prevState, fetchProductById.pending('', 1));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.selectedProduct).toBeNull();
    });

    it('should set selectedProduct on fulfilled', () => {
      const state = productReducer(
        initialState,
        fetchProductById.fulfilled(mockProducts[0], '', 1),
      );
      expect(state.loading).toBe(false);
      expect(state.selectedProduct).toEqual(mockProducts[0]);
    });

    it('should set error and show toast on rejected', () => {
      const state = productReducer(initialState, fetchProductById.rejected(new Error(''), '', 1));
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        'Failed to fetch product. Please try again.',
        ToastAndroid.LONG,
      );
    });

    it('should set error from rejectWithValue on rejected', () => {
      const state = productReducer(
        initialState,
        fetchProductById.rejected(
          new Error(''),
          '',
          1,
          'Failed to fetch product. Please try again.',
        ),
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch product. Please try again.');
    });
  });

  describe('selectors', () => {
    const mockState = {
      product: {
        products: mockProducts,
        selectedProduct: mockProducts[0],
        loading: true,
        error: 'Something went wrong',
      },
    };

    it('selectProducts should return products', () => {
      expect(selectProducts(mockState)).toEqual(mockProducts);
    });

    it('selectSelectedProduct should return selectedProduct', () => {
      expect(selectSelectedProduct(mockState)).toEqual(mockProducts[0]);
    });

    it('selectProductsLoading should return loading', () => {
      expect(selectProductsLoading(mockState)).toBe(true);
    });

    it('selectProductsError should return error', () => {
      expect(selectProductsError(mockState)).toBe('Something went wrong');
    });
  });
});
