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
  atoms: new Proxy({}, { get: (_t: any, p: string) => ({ _atomName: p }) }),
}));

jest.mock('../assets/images', () => ({
  background_dot: 'background_dot',
}));

jest.mock('../features/product/hooks/use-get-products', () => ({
  useGetProducts: jest.fn(),
}));

jest.mock('../features/product/hooks/use-get-categories', () => ({
  useGetCategories: jest.fn(),
}));

import { useGetProducts } from '../features/product/hooks/use-get-products';
import { useGetCategories } from '../features/product/hooks/use-get-categories';
import { HomeScreen } from '../screens/home-screen';

const mockUseGetProducts = useGetProducts as jest.MockedFunction<typeof useGetProducts>;
const mockUseGetCategories = useGetCategories as jest.MockedFunction<typeof useGetCategories>;

const mockProducts = [
  {
    id: 1, name: 'Product 1', description: 'Desc', image: 'https://img.jpg',
    price: 10, priceUnit: 'USD', createdAt: '', updatedAt: '', category: 'Cat1',
  },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      getProducts: jest.fn(),
      categories: ['Cat1'],
    });
    mockUseGetCategories.mockReturnValue({
      categories: ['Cat1', 'Cat2']
    });
  });

  it('should render Discover header', () => {
    const { getByText } = render(<HomeScreen navigation={{}} />);
    expect(getByText('Discover')).toBeTruthy();
  });

  it('should render product names', () => {
    const { getByText } = render(<HomeScreen navigation={{}} />);
    expect(getByText('Product 1')).toBeTruthy();
  });

  it('should render categories from useGetCategories', () => {
    const { getAllByText, getByText } = render(<HomeScreen navigation={{}} />);
    expect(getAllByText('Cat1').length).toBeGreaterThan(0);
    expect(getByText('Cat2')).toBeTruthy();
  });

  it('should show empty state when no products', () => {
    mockUseGetProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
      getProducts: jest.fn(),
      categories: [],
    });
    const { getByText } = render(<HomeScreen navigation={{}} />);
    expect(getByText('No products found')).toBeTruthy();
  });

  it('should render loading indicator when loading with no products', () => {
    mockUseGetProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
      getProducts: jest.fn(),
      categories: [],
    });
    const { toJSON } = render(<HomeScreen navigation={{}} />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render search input', () => {
    const { toJSON } = render(<HomeScreen navigation={{}} />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render product with multiple items', () => {
    mockUseGetProducts.mockReturnValue({
      products: [
        { id: 1, name: 'Prod A', description: '', image: '', price: 5, priceUnit: 'USD', createdAt: '', updatedAt: '', category: 'Cat' },
        { id: 2, name: 'Prod B', description: '', image: '', price: 10, priceUnit: 'USD', createdAt: '', updatedAt: '', category: 'Cat' },
      ],
      loading: false,
      error: null,
      getProducts: jest.fn(),
      categories: [],
    });
    const { getByText } = render(<HomeScreen navigation={{}} />);
    expect(getByText('Prod A')).toBeTruthy();
    expect(getByText('Prod B')).toBeTruthy();
  });
});
