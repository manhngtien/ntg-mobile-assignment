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

jest.mock('redux-logger', () => {
  const logger = () => (next: any) => (action: any) => next(action);
  return { __esModule: true, default: logger };
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn((selector: any) =>
    selector({
      auth: {
        user: null,
        loading: false,
        isAuthenticated: null,
        isLoginSuccess: null,
        error: null,
      },
      product: { products: [], selectedProduct: null, loading: false, error: null },
    }),
  ),
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

  it('should have auth initial state properties', () => {
    const state = store.getState();
    expect(state.auth).toHaveProperty('user');
    expect(state.auth).toHaveProperty('loading');
    expect(state.auth).toHaveProperty('isAuthenticated');
    expect(state.auth).toHaveProperty('isLoginSuccess');
    expect(state.auth).toHaveProperty('error');
  });

  it('should have product initial state properties', () => {
    const state = store.getState();
    expect(state.product).toHaveProperty('products');
    expect(state.product).toHaveProperty('selectedProduct');
    expect(state.product).toHaveProperty('loading');
    expect(state.product).toHaveProperty('error');
  });

  it('should dispatch actions', () => {
    store.dispatch({ type: 'test/action' });
    expect(store.getState()).toBeDefined();
  });

  it('should update state when action is dispatched', () => {
    const initialState = store.getState();
    store.dispatch({ type: 'test/action' });
    const nextState = store.getState();
    expect(nextState).toBeDefined();
    expect(nextState.auth).toEqual(initialState.auth);
    expect(nextState.product).toEqual(initialState.product);
  });

  it('should have subscribe function', () => {
    expect(typeof store.subscribe).toBe('function');
  });

  it('should have replaceReducer function', () => {
    expect(typeof store.replaceReducer).toBe('function');
  });
});

describe('typed hooks', () => {
  it('useAppDispatch should be a function', () => {
    expect(typeof useAppDispatch).toBe('function');
  });

  it('useAppSelector should be a function', () => {
    expect(typeof useAppSelector).toBe('function');
  });

  it('useAppDispatch should return a function when called', () => {
    const dispatch = useAppDispatch();
    expect(typeof dispatch).toBe('function');
  });

  it('useAppSelector should return selected state', () => {
    const result = useAppSelector((state: any) => state.auth);
    expect(result).toBeDefined();
  });
});
