import React from 'react';
import { render } from '@testing-library/react-native';

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
      dark_100: '#1F2937', dark_200: '#111827', dark_300: '#0F172A',
      gray_50: '#F3F4F6', gray_100: '#F9FAFB', gray_200: '#D1D5DB',
      gray_300: '#E5E7EB', gray_400: '#9CA3AF', gray_500: '#6B7280',
      gray_600: '#4B5563', gray_700: '#374151',
      white: '#FFFFFF', white_80: '#FFFFFF80', black: '#000000',
      cyan: '#06B6D4', cyan_50: '#ECFEFF', cyan_100: '#0DF2F21A', cyan_200_20: '#06B6D420',
      teal: '#14B8A6', transparent: 'transparent',
      slate_100: '#F1F5F9', slate_400: '#94A3B8',
      red_50: '#FEF2F2', red_500: '#EF4444',
    },
  },
}));

jest.mock('../styles/atoms', () => ({
  atoms: new Proxy({}, { get: (_target, prop) => ({ _atomName: prop }) }),
}));

jest.mock('../assets/images', () => ({
  background_dot: 'background_dot',
}));

import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('should render input', () => {
    const { toJSON } = render(<TextInput placeholder="Enter text" />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render label when provided', () => {
    const { getByText } = render(<TextInput label="Email" placeholder="Enter email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('should not render label when not provided', () => {
    const { queryByText } = render(<TextInput placeholder="No label" />);
    expect(queryByText('Email')).toBeNull();
  });

  it('should render description when provided and no error', () => {
    const { getByText } = render(<TextInput description="Helper text" placeholder="Input" />);
    expect(getByText('Helper text')).toBeTruthy();
  });

  it('should not render description when errorText is present', () => {
    const { queryByText } = render(<TextInput description="Helper" errorText="Error!" placeholder="Input" />);
    expect(queryByText('Helper')).toBeNull();
  });

  it('should render errorText when provided', () => {
    const { getByText } = render(<TextInput errorText="Field is required" placeholder="Input" />);
    expect(getByText('Field is required')).toBeTruthy();
  });

  it('should not render errorText when not provided', () => {
    const { queryByText } = render(<TextInput placeholder="Input" />);
    expect(queryByText('Field is required')).toBeNull();
  });
});
