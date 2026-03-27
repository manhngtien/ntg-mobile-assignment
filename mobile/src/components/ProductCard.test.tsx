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

import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'A test product',
    image: 'https://example.com/product.jpg',
    price: 29.99,
    priceUnit: 'USD',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    category: 'Electronics',
  };

  it('should render product name', () => {
    const { getByText } = render(<ProductCard item={mockProduct} />);
    expect(getByText('Test Product')).toBeTruthy();
  });

  it('should render product category', () => {
    const { getByText } = render(<ProductCard item={mockProduct} />);
    expect(getByText('Electronics')).toBeTruthy();
  });

  it('should render product price', () => {
    const { getByText } = render(<ProductCard item={mockProduct} />);
    expect(getByText('$29.99')).toBeTruthy();
  });

  it('should render price with zero cents', () => {
    const product = { ...mockProduct, price: 30 };
    const { getByText } = render(<ProductCard item={product} />);
    expect(getByText('$30.00')).toBeTruthy();
  });
});
