import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: any) => React.createElement(View, props, children),
  };
});

jest.mock('@react-native-vector-icons/fontawesome-free-solid', () => 'FontAwesomeFreeSolid');

jest.mock('../styles/theme', () => ({
  theme: {
    colors: {
      dark_100: '#1F2937',
      dark_200: '#111827',
      dark_300: '#0F172A',
      gray_50: '#F3F4F6',
      gray_100: '#F9FAFB',
      gray_200: '#D1D5DB',
      gray_300: '#E5E7EB',
      gray_400: '#9CA3AF',
      gray_500: '#6B7280',
      gray_600: '#4B5563',
      gray_700: '#374151',
      white: '#FFFFFF',
      white_80: '#FFFFFF80',
      black: '#000000',
      cyan: '#06B6D4',
      cyan_50: '#ECFEFF',
      cyan_100: '#0DF2F21A',
      cyan_200_20: '#06B6D420',
      teal: '#14B8A6',
      transparent: 'transparent',
      slate_100: '#F1F5F9',
      slate_400: '#94A3B8',
      red_50: '#FEF2F2',
      red_500: '#EF4444',
    },
  },
}));

jest.mock('../styles/atoms', () => ({
  atoms: new Proxy({}, { get: (_t: any, p: string) => ({ _atomName: p }) }),
}));

jest.mock('../assets/images', () => ({
  background_dot: 'background_dot',
}));

jest.mock('../features/auth/hooks/use-login', () => ({
  useLogin: jest.fn(),
}));

import { useLogin } from '../features/auth/hooks/use-login';
import { LogInScreen } from '../screens/login-screen';

const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;

describe('LogInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLogin.mockReturnValue({
      user: null,
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('should render welcome text', () => {
    const { getByText } = render(<LogInScreen navigation={{}} />);
    expect(getByText('Welcome back')).toBeTruthy();
  });

  it('should render subtitle', () => {
    const { getByText } = render(<LogInScreen navigation={{}} />);
    expect(getByText('Please enter your details')).toBeTruthy();
  });

  it('should render Login and Sign Up buttons', () => {
    const { getByText } = render(<LogInScreen navigation={{}} />);
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('should render username and password inputs', () => {
    const { getByText } = render(<LogInScreen navigation={{}} />);
    expect(getByText('Username')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
  });

  it('should render Sign In button', () => {
    const { getByText } = render(<LogInScreen navigation={{}} />);
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('should render forgot password link', () => {
    const { getByText } = render(<LogInScreen navigation={{}} />);
    expect(getByText('Forgot password?')).toBeTruthy();
  });

  it('should render biometrics checkbox text', () => {
    const { getByText } = render(<LogInScreen navigation={{}} />);
    expect(getByText('Use biometrics for faster login')).toBeTruthy();
  });

  it('should call login on Sign In press', () => {
    const mockLogin = jest.fn();
    mockUseLogin.mockReturnValue({
      user: null,
      loading: false,
      login: mockLogin,
      logout: jest.fn(),
    });
    const { getByText } = render(<LogInScreen navigation={{}} />);
    fireEvent.press(getByText('Sign In'));
    expect(mockLogin).toHaveBeenCalledWith({ username: '', password: '' });
  });

  it('should render with loading state', () => {
    mockUseLogin.mockReturnValue({
      user: null,
      loading: true,
      login: jest.fn(),
      logout: jest.fn(),
    });
    const { toJSON } = render(<LogInScreen navigation={{}} />);
    expect(toJSON()).toBeTruthy();
  });
});
