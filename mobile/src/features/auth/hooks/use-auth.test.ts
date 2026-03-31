import { act, renderHook } from '@testing-library/react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { initializeAuth } from '../auth-thunk';
import { useAuth } from './use-auth';

jest.mock('../../../redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../auth-thunk', () => ({
  initializeAuth: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockInitializeAuth = initializeAuth as jest.MockedFunction<typeof initializeAuth>;
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockReturnValue({ unwrap: jest.fn() });
  });

  const setupSelector = (
    overrides: {
      user?: any;
      loading?: boolean;
      isAuthenticated?: boolean | null;
    } = {},
  ) => {
    const user = overrides.user ?? null;
    const loading = overrides.loading ?? false;
    const isAuthenticated = overrides.isAuthenticated ?? null;

    mockUseAppSelector.mockImplementation((selector) => {
      const state = { auth: { user, loading, isAuthenticated } } as any;
      return selector(state);
    });

    return { user, loading, isAuthenticated };
  };

  it('should return user from the store', () => {
    const mockUser = { id: '1', username: 'testuser' };
    setupSelector({ user: mockUser });
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockUser);
  });

  it('should return null user when not authenticated', () => {
    setupSelector();
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
  });

  it('should return loading state from the store', () => {
    setupSelector({ loading: true });
    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
  });

  it('should return isAuthenticated from the store', () => {
    setupSelector({ isAuthenticated: true });
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should return isAuthenticated as null initially', () => {
    setupSelector();
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBeNull();
  });

  it('should call dispatch with initializeAuth when fetchAuthUser is called', () => {
    setupSelector();
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.fetchAuthUser();
    });

    expect(mockInitializeAuth).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should return stable fetchAuthUser reference across re-renders', () => {
    setupSelector();
    const { result, rerender } = renderHook(() => useAuth());

    const firstFetchAuthUser = result.current.fetchAuthUser;
    rerender({});

    expect(result.current.fetchAuthUser).toBe(firstFetchAuthUser);
  });
});
