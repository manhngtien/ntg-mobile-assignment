import { renderHook, act } from '@testing-library/react-native';
import { useLogin } from './use-login';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { loginUser, logoutUser } from '../auth-thunk';

jest.mock('../../../redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../auth-thunk', () => ({
  loginUser: jest.fn(),
  logoutUser: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockLoginUser = loginUser as jest.MockedFunction<typeof loginUser>;
const mockLogoutUser = logoutUser as jest.MockedFunction<typeof logoutUser>;
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockReturnValue({ unwrap: jest.fn() });
  });

  const setupSelector = (overrides: {
    user?: any;
    loading?: boolean;
  } = {}) => {
    const user = overrides.user ?? null;
    const loading = overrides.loading ?? false;

    mockUseAppSelector.mockImplementation((selector) => {
      const state = { auth: { user, loading } } as any;
      return selector(state);
    });

    return { user, loading };
  };

  it('should return user from the store', () => {
    const mockUser = { id: '1', username: 'testuser' };
    setupSelector({ user: mockUser });
    const { result } = renderHook(() => useLogin());

    expect(result.current.user).toEqual(mockUser);
  });

  it('should return null user when not logged in', () => {
    setupSelector();
    const { result } = renderHook(() => useLogin());

    expect(result.current.user).toBeNull();
  });

  it('should return loading state from the store', () => {
    setupSelector({ loading: true });
    const { result } = renderHook(() => useLogin());

    expect(result.current.loading).toBe(true);
  });

  it('should call dispatch with loginUser when login is called', () => {
    setupSelector();
    const { result } = renderHook(() => useLogin());
    const credentials = { username: 'testuser', password: 'password123' };

    act(() => {
      result.current.login(credentials);
    });

    expect(mockLoginUser).toHaveBeenCalledWith(credentials);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call dispatch with logoutUser when logout is called', () => {
    setupSelector();
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.logout();
    });

    expect(mockLogoutUser).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should return stable login reference across re-renders', () => {
    setupSelector();
    const { result, rerender } = renderHook(() => useLogin());

    const firstLogin = result.current.login;
    rerender({});

    expect(result.current.login).toBe(firstLogin);
  });

  it('should return stable logout reference across re-renders', () => {
    setupSelector();
    const { result, rerender } = renderHook(() => useLogin());

    const firstLogout = result.current.logout;
    rerender({});

    expect(result.current.logout).toBe(firstLogout);
  });
});
