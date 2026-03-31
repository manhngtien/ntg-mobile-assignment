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
  atoms: new Proxy({}, { get: (_target, prop) => ({ _atomName: prop }) }),
}));

jest.mock('../assets/images', () => ({
  background_dot: 'background_dot',
}));

import { FilterChipList } from './FilterChipList';

describe('FilterChipList', () => {
  it('should render chips', () => {
    const chips = ['Electronics', 'Food'];
    const { getByText } = render(
      <FilterChipList filterChips={chips} handleChipPress={jest.fn()} />,
    );
    expect(getByText('Electronics')).toBeTruthy();
    expect(getByText('Food')).toBeTruthy();
  });

  it('should call handleChipPress when chip is pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <FilterChipList filterChips={['Electronics']} handleChipPress={onPress} />,
    );
    fireEvent.press(getByText('Electronics'));
    expect(onPress).toHaveBeenCalledWith('Electronics');
  });

  it('should deselect chip when pressed again', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <FilterChipList filterChips={['Electronics']} handleChipPress={onPress} />,
    );
    fireEvent.press(getByText('Electronics'));
    fireEvent.press(getByText('Electronics'));
    expect(onPress).toHaveBeenNthCalledWith(1, 'Electronics');
    expect(onPress).toHaveBeenNthCalledWith(2, '');
  });

  it('should select different chip', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <FilterChipList filterChips={['Electronics', 'Food']} handleChipPress={onPress} />,
    );
    fireEvent.press(getByText('Electronics'));
    fireEvent.press(getByText('Food'));
    expect(onPress).toHaveBeenNthCalledWith(1, 'Electronics');
    expect(onPress).toHaveBeenNthCalledWith(2, 'Food');
  });

  it('should render empty list', () => {
    const { toJSON } = render(<FilterChipList filterChips={[]} handleChipPress={jest.fn()} />);
    expect(toJSON()).toBeTruthy();
  });
});
