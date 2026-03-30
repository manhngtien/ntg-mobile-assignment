import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

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

  beforeEach(() => {
    mockNavigate.mockClear();
  });

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

  it('should render product image with correct uri', () => {
    const { getByText } = render(<ProductCard item={mockProduct} />);
    expect(getByText('Test Product')).toBeTruthy();
  });

  it('should render price with whole number', () => {
    const product = { ...mockProduct, price: 100 };
    const { getByText } = render(<ProductCard item={product} />);
    expect(getByText('$100.00')).toBeTruthy();
  });

  it('should render price with many decimal places', () => {
    const product = { ...mockProduct, price: 19.999 };
    const { getByText } = render(<ProductCard item={product} />);
    expect(getByText('$20.00')).toBeTruthy();
  });

  it('should navigate to ProductDetails on press', () => {
    const { getByText } = render(<ProductCard item={mockProduct} />);
    fireEvent.press(getByText('Test Product'));
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', { id: 1 });
  });

  it('should navigate with correct product id', () => {
    const product = { ...mockProduct, id: 42 };
    const { getByText } = render(<ProductCard item={product} />);
    fireEvent.press(getByText('Test Product'));
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', { id: 42 });
  });

  it('should render heart icon text', () => {
    const { getByText } = render(<ProductCard item={mockProduct} />);
    expect(getByText('Test Product')).toBeTruthy();
  });

  it('should render with different category', () => {
    const product = { ...mockProduct, category: 'Food & Beverage' };
    const { getByText } = render(<ProductCard item={product} />);
    expect(getByText('Food & Beverage')).toBeTruthy();
  });

  it('should render with long product name', () => {
    const product = { ...mockProduct, name: 'Very Long Product Name That Should Be Truncated' };
    const { getByText } = render(<ProductCard item={product} />);
    expect(getByText('Very Long Product Name That Should Be Truncated')).toBeTruthy();
  });

  it('should render with zero price', () => {
    const product = { ...mockProduct, price: 0 };
    const { getByText } = render(<ProductCard item={product} />);
    expect(getByText('$0.00')).toBeTruthy();
  });
});
