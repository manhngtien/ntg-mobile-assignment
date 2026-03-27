jest.mock('react-native-config', () => ({
  API_BASE_URL: 'http://localhost',
  DB_NAME: 'test.db',
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
    });
  });

  it('should have product initial state', () => {
    const state = rootReducer(undefined, { type: 'unknown' });
    expect(state.product).toEqual({
      products: [],
      loading: false,
      error: null,
    });
  });

  it('should return same state for unknown action', () => {
    const prevState = rootReducer(undefined, { type: 'unknown' });
    const nextState = rootReducer(prevState, { type: 'unknown' });
    expect(nextState).toEqual(prevState);
  });
});
