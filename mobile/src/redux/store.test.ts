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

jest.mock('redux-logger', () => {
  const logger = () => (next: any) => (action: any) => next(action);
  return { __esModule: true, default: logger };
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn((selector: any) => selector({
    auth: { user: null, loading: false, isAuthenticated: null, isLoginSuccess: null },
    product: { products: [], loading: false, error: null },
  })),
  TypedUseSelectorHook: jest.fn(),
}));

import store, { useAppDispatch, useAppSelector } from './store';

describe('store', () => {
  it('should be configured', () => {
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
  });

  it('should return initial state', () => {
    const state = store.getState();
    expect(state.auth).toBeDefined();
    expect(state.product).toBeDefined();
  });

  it('should dispatch actions', () => {
    store.dispatch({ type: 'test/action' });
    expect(store.getState()).toBeDefined();
  });
});

describe('typed hooks', () => {
  it('useAppDispatch should be a function', () => {
    expect(typeof useAppDispatch).toBe('function');
  });

  it('useAppSelector should be a function', () => {
    expect(typeof useAppSelector).toBe('function');
  });
});
