import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: any) => React.createElement(View, props, children),
  };
});

jest.mock('@react-native-vector-icons/fontawesome-free-solid', () => 'FontAwesomeFreeSolid');

jest.mock('../../styles/theme', () => ({
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

jest.mock('../../styles/atoms', () => ({
  atoms: new Proxy({}, { get: (_t: any, p: string) => ({ _atomName: p }) }),
}));

jest.mock('../../assets/images', () => ({
  background_dot: 'background_dot',
}));

jest.mock('react-native-config', () => ({
  Config: {
    API_BASE_URL: 'http://localhost',
    DB_NAME: 'test_db',
  },
}));

jest.mock('react-native-nitro-sqlite', () => ({
  open: jest.fn(),
  execute: jest.fn(),
}));

jest.mock('../../features/product/hooks/use-get-products', () => ({
  useGetProducts: jest.fn(),
}));

jest.mock('../../features/product/hooks/use-get-categories', () => ({
  useGetCategories: jest.fn(),
}));

jest.mock('../../features/auth/hooks/use-login', () => ({
  useLogin: jest.fn(),
}));

jest.mock('../../features/auth/hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');
  return {
    createBottomTabNavigator: () => {
      const Navigator = ({ children, ...props }: any) => {
        const screens = React.Children.toArray(children);
        return React.createElement(
          React.Fragment,
          null,
          ...screens.map((s: any) => {
            if (s && s.props && s.props.component) {
              const Comp = s.props.component;
              return React.createElement(Comp, { key: s.props.name, navigation: {} });
            }
            return s;
          }),
        );
      };
      const Screen = ({ children }: any) => children || null;
      return { Navigator, Screen };
    },
  };
});

import { useAuth } from '../../features/auth/hooks/use-auth';
import { useLogin } from '../../features/auth/hooks/use-login';
import { useGetCategories } from '../../features/product/hooks/use-get-categories';
import { useGetProducts } from '../../features/product/hooks/use-get-products';

const mockUseGetProducts = useGetProducts as jest.MockedFunction<typeof useGetProducts>;
const mockUseGetCategories = useGetCategories as jest.MockedFunction<typeof useGetCategories>;
const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('MainNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
      getProducts: jest.fn(),
      categories: [],
    });
    mockUseGetCategories.mockReturnValue({
      categories: [],
    });
    mockUseLogin.mockReturnValue({
      user: null,
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
      fetchAuthUser: jest.fn(),
      error: null,
    });
  });

  it('should render without crashing', () => {
    const MainNavigator = require('./main-navigator').default;
    const { toJSON } = render(<MainNavigator navigation={{}} />);
    expect(toJSON()).toBeTruthy();
  });
});
