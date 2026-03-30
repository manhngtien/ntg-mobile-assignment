jest.mock('react-native-config', () => ({
  API_BASE_URL: 'http://localhost',
  DB_NAME: 'test.db',
}));

jest.mock('react-native', () => ({
  ToastAndroid: { show: jest.fn() },
}));

jest.mock('../features/auth/auth-thunk', () => ({
  loginUser: Object.assign(jest.fn(), {
    pending: { type: 'auth/loginUser/pending' },
    fulfilled: { type: 'auth/loginUser/fulfilled' },
    rejected: { type: 'auth/loginUser/rejected' },
  }),
  initializeAuth: Object.assign(jest.fn(), {
    pending: { type: 'auth/initializeAuth/pending' },
    fulfilled: { type: 'auth/initializeAuth/fulfilled' },
    rejected: { type: 'auth/initializeAuth/rejected' },
  }),
  logoutUser: Object.assign(jest.fn(), {
    pending: { type: 'auth/logoutUser/pending' },
    fulfilled: { type: 'auth/logoutUser/fulfilled' },
    rejected: { type: 'auth/logoutUser/rejected' },
  }),
}));

jest.mock('../features/product/product-thunk', () => ({
  fetchProducts: Object.assign(jest.fn(), {
    pending: { type: 'product/fetchProducts/pending' },
    fulfilled: { type: 'product/fetchProducts/fulfilled' },
    rejected: { type: 'product/fetchProducts/rejected' },
  }),
  fetchProductById: Object.assign(jest.fn(), {
    pending: { type: 'product/fetchProductById/pending' },
    fulfilled: { type: 'product/fetchProductById/fulfilled' },
    rejected: { type: 'product/fetchProductById/rejected' },
  }),
}));

import rootReducer from './root-reducer';

describe('rootReducer', () => {
  it('should combine auth and product reducers', () => {
    const state = rootReducer(undefined, { type: 'unknown' });
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('product');
  });

  it('should have auth initial state', () => {
    const state = rootReducer(undefined, { type: 'unknown' });
    expect(state.auth).toEqual({
      user: null,
      loading: false,
      isAuthenticated: null,
      isLoginSuccess: null,
      error: null,
    });
  });

  it('should have product initial state', () => {
    const state = rootReducer(undefined, { type: 'unknown' });
    expect(state.product).toEqual({
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
    });
  });

  it('should return same state for unknown action', () => {
    const prevState = rootReducer(undefined, { type: 'unknown' });
    const nextState = rootReducer(prevState, { type: 'unknown' });
    expect(nextState).toEqual(prevState);
  });

  it('should handle fetchProducts.pending action', () => {
    const state = rootReducer(undefined, { type: 'product/fetchProducts/pending' });
    expect(state.product.loading).toBe(true);
    expect(state.product.error).toBeNull();
  });

  it('should handle fetchProducts.fulfilled action', () => {
    const mockProducts = [{ id: 1, name: 'Product 1', description: '', image: '', price: 10, priceUnit: 'USD', createdAt: '', updatedAt: '', category: '' }];
    const state = rootReducer(undefined, { type: 'product/fetchProducts/fulfilled', payload: mockProducts });
    expect(state.product.loading).toBe(false);
    expect(state.product.products).toEqual(mockProducts);
  });

  it('should handle fetchProducts.rejected action', () => {
    const state = rootReducer(undefined, { type: 'product/fetchProducts/rejected', payload: 'Error message' });
    expect(state.product.loading).toBe(false);
    expect(state.product.error).toBe('Error message');
  });

  it('should handle fetchProductById.pending action', () => {
    const state = rootReducer(undefined, { type: 'product/fetchProductById/pending' });
    expect(state.product.loading).toBe(true);
    expect(state.product.error).toBeNull();
    expect(state.product.selectedProduct).toBeNull();
  });

  it('should handle fetchProductById.fulfilled action', () => {
    const mockProduct = { id: 1, name: 'Product 1', description: '', image: '', price: 10, priceUnit: 'USD', createdAt: '', updatedAt: '', category: '' };
    const state = rootReducer(undefined, { type: 'product/fetchProductById/fulfilled', payload: mockProduct });
    expect(state.product.loading).toBe(false);
    expect(state.product.selectedProduct).toEqual(mockProduct);
  });

  it('should handle fetchProductById.rejected action', () => {
    const state = rootReducer(undefined, { type: 'product/fetchProductById/rejected', payload: 'Error message' });
    expect(state.product.loading).toBe(false);
    expect(state.product.error).toBe('Error message');
  });

  it('should handle loginUser.pending action', () => {
    const state = rootReducer(undefined, { type: 'auth/loginUser/pending' });
    expect(state.auth.loading).toBe(true);
  });

  it('should handle loginUser.rejected action', () => {
    const state = rootReducer(undefined, { type: 'auth/loginUser/rejected' });
    expect(state.auth.loading).toBe(false);
    expect(state.auth.isLoginSuccess).toBe(false);
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.error).toBe('Failed to login');
  });

  it('should handle initializeAuth.pending action', () => {
    const state = rootReducer(undefined, { type: 'auth/initializeAuth/pending' });
    expect(state.auth.loading).toBe(true);
  });

  it('should handle initializeAuth.rejected action', () => {
    const state = rootReducer(undefined, { type: 'auth/initializeAuth/rejected' });
    expect(state.auth.loading).toBe(false);
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.error).toBe('Failed to initialize auth');
  });

  it('should handle logoutUser.fulfilled action', () => {
    const prevState = rootReducer(undefined, { type: 'unknown' });
    const state = rootReducer(prevState, { type: 'auth/logoutUser/fulfilled' });
    expect(state.auth.user).toBeNull();
    expect(state.auth.isAuthenticated).toBeNull();
    expect(state.auth.isLoginSuccess).toBeNull();
  });

  it('should maintain auth state when product action is dispatched', () => {
    const authState = rootReducer(undefined, { type: 'unknown' });
    const state = rootReducer(authState, { type: 'product/fetchProducts/pending' });
    expect(state.auth).toEqual(authState.auth);
  });

  it('should maintain product state when auth action is dispatched', () => {
    const prevState = rootReducer(undefined, { type: 'unknown' });
    const state = rootReducer(prevState, { type: 'auth/loginUser/pending' });
    expect(state.product).toEqual(prevState.product);
  });
});
