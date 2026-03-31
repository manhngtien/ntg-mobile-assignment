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

jest.mock('../features/auth/hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-native-config', () => ({
  Config: {
    API_BASE_URL: 'http://localhost',
    DB_NAME: 'test_db',
  },
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

import { useAuth } from '../features/auth/hooks/use-auth';
import { useLogin } from '../features/auth/hooks/use-login';
import { ProfileScreen } from '../screens/profile-screen';

const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        age: 25,
        role: 'user',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: '',
        updatedAt: '',
      },
      loading: false,
      isAuthenticated: true,
      fetchAuthUser: jest.fn(),
      error: null,
    });
    mockUseLogin.mockReturnValue({
      user: null,
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('should render Profile Settings header', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Profile Settings')).toBeTruthy();
  });

  it('should render user name', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('should render username', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('@testuser')).toBeTruthy();
  });

  it('should render premium member badge', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('PREMIUM MEMBER')).toBeTruthy();
  });

  it('should render Account Details section', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Account Details')).toBeTruthy();
  });

  it('should render user email', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('test@test.com')).toBeTruthy();
  });

  it('should render user first and last name', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('John')).toBeTruthy();
    expect(getByText('Doe')).toBeTruthy();
  });

  it('should render user age', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('25')).toBeTruthy();
  });

  it('should render N/A when age is falsy', () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        age: 0,
        role: 'user',
        firstName: 'J',
        lastName: 'D',
        createdAt: '',
        updatedAt: '',
      },
      loading: false,
      isAuthenticated: true,
      fetchAuthUser: jest.fn(),
      error: null,
    });
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('N/A')).toBeTruthy();
  });

  it('should render Edit Details button', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Edit Details')).toBeTruthy();
  });

  it('should render Order History menu item', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Order History')).toBeTruthy();
  });

  it('should render Logout menu item', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Logout')).toBeTruthy();
  });

  it('should render EMAIL ADDRESS label', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('EMAIL ADDRESS')).toBeTruthy();
  });

  it('should render FIRST NAME and LAST NAME labels', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('FIRST NAME')).toBeTruthy();
    expect(getByText('LAST NAME')).toBeTruthy();
  });

  it('should render AGE label', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('AGE')).toBeTruthy();
  });

  it('should render with null user', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
      fetchAuthUser: jest.fn(),
      error: null,
    });
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Profile Settings')).toBeTruthy();
  });

  it('should call logout on Logout press', () => {
    const mockLogout = jest.fn();
    mockUseLogin.mockReturnValue({
      user: null,
      loading: false,
      login: jest.fn(),
      logout: mockLogout,
    });
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('should navigate to Orders on Order History press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<ProfileScreen navigation={{ navigate: mockNavigate }} />);
    fireEvent.press(getByText('Order History'));
    expect(mockNavigate).toHaveBeenCalledWith('Orders');
  });
});
