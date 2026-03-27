const makeActionCreator = (type: string) => {
  const creator: any = (payload: any, _requestId?: string, arg?: any) => ({
    type,
    payload,
    meta: { arg, requestId: _requestId ?? '' },
  });
  creator.type = type;
  return creator;
};

jest.mock('./auth-thunk', () => ({
  loginUser: Object.assign(jest.fn(), {
    pending: makeActionCreator('auth/loginUser/pending'),
    fulfilled: makeActionCreator('auth/loginUser/fulfilled'),
    rejected: makeActionCreator('auth/loginUser/rejected'),
  }),
  initializeAuth: Object.assign(jest.fn(), {
    pending: makeActionCreator('auth/initializeAuth/pending'),
    fulfilled: makeActionCreator('auth/initializeAuth/fulfilled'),
    rejected: makeActionCreator('auth/initializeAuth/rejected'),
  }),
  logoutUser: Object.assign(jest.fn(), {
    pending: makeActionCreator('auth/logoutUser/pending'),
    fulfilled: makeActionCreator('auth/logoutUser/fulfilled'),
    rejected: makeActionCreator('auth/logoutUser/rejected'),
  }),
}));

import authReducer, {
  selectUser,
  selectLoading,
  selectIsAuthenticated,
  selectIsLoginSuccess,
} from './auth-slice';
import { loginUser, initializeAuth, logoutUser } from './auth-thunk';

const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  age: 25,
  role: 'user',
  firstName: 'Test',
  lastName: 'User',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

const mockLoginPayload = {
  user: mockUser,
  token: 'test-token',
};

describe('authSlice', () => {
  const initialState = {
    user: null,
    loading: false,
    isAuthenticated: null,
    isLoginSuccess: null,
    error: null,
  };

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('initializeAuth', () => {
    it('should set loading to true on pending', () => {
      const state = authReducer(initialState, initializeAuth.pending(''));
      expect(state.loading).toBe(true);
    });

    it('should set user and isAuthenticated on fulfilled with user', () => {
      const state = authReducer(initialState, initializeAuth.fulfilled(mockUser, '', undefined));
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should not set user on fulfilled with null', () => {
      const state = authReducer(initialState, initializeAuth.fulfilled(null, '', undefined));
      expect(state.loading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBeNull();
    });

    it('should set isAuthenticated to false on rejected', () => {
      const state = authReducer(initialState, initializeAuth.rejected(Error(), '', undefined));
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('loginUser', () => {
    const credentials = { username: 'test', password: '123' };

    it('should set loading to true on pending', () => {
      const state = authReducer(initialState, loginUser.pending('', credentials));
      expect(state.loading).toBe(true);
    });

    it('should set user, isAuthenticated and isLoginSuccess on fulfilled', () => {
      const state = authReducer(initialState, loginUser.fulfilled(mockLoginPayload, '', credentials));
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoginSuccess).toBe(true);
    });

    it('should set isLoginSuccess to false on rejected', () => {
      const state = authReducer(initialState, loginUser.rejected(Error(), '', credentials));
      expect(state.loading).toBe(false);
      expect(state.isLoginSuccess).toBe(false);
    });
  });

  describe('logoutUser', () => {
    it('should reset state on fulfilled', () => {
      const loggedInState = {
        user: mockUser,
        loading: false,
        isAuthenticated: true,
        isLoginSuccess: true,
        error: null,
      };
      const state = authReducer(loggedInState, logoutUser.fulfilled(undefined, '', undefined));
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBeNull();
      expect(state.isLoginSuccess).toBeNull();
    });
  });

  describe('selectors', () => {
    const mockState = {
      auth: {
        user: mockUser,
        loading: true,
        isAuthenticated: true,
        isLoginSuccess: true,
        error: null,
      },
    };

    it('selectUser should return user', () => {
      expect(selectUser(mockState)).toEqual(mockUser);
    });

    it('selectLoading should return loading', () => {
      expect(selectLoading(mockState)).toBe(true);
    });

    it('selectIsAuthenticated should return isAuthenticated', () => {
      expect(selectIsAuthenticated(mockState)).toBe(true);
    });

    it('selectIsLoginSuccess should return isLoginSuccess', () => {
      expect(selectIsLoginSuccess(mockState)).toBe(true);
    });
  });
});
