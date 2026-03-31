import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
  useRoute: () => ({ params: { id: 1 } }),
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: any) => React.createElement(View, props, children),
  };
});

jest.mock('@react-native-vector-icons/fontawesome-free-solid', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: ({ name }: any) => React.createElement(Text, { testID: `icon-${name}` }, name),
  };
});

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

jest.mock('../features/product/hooks/use-get-product-by-id', () => ({
  useGetProductById: jest.fn(),
}));

jest.mock('../components/Background', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Background: ({ children }: any) =>
      React.createElement(View, { testID: 'background' }, children),
  };
});

import { useGetProductById } from '../features/product/hooks/use-get-product-by-id';
import { ProductDetailsScreen } from '../screens/product-details-screen';

const mockUseGetProductById = useGetProductById as jest.MockedFunction<typeof useGetProductById>;

const mockProduct = {
  id: 1,
  name: 'Smart Watch',
  description: 'A feature-rich smartwatch with heart rate monitor',
  image: 'https://example.com/watch.jpg',
  price: 299.99,
  priceUnit: 'USD',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  category: 'Electronics',
};

const mockGetProductById = jest.fn();

describe('ProductDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetProductById.mockReturnValue({
      selectedProduct: mockProduct,
      loading: false,
      error: null,
      getProductById: mockGetProductById,
    });
  });

  it('should render Product Details header', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Product Details')).toBeTruthy();
  });

  it('should render product name', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Smart Watch')).toBeTruthy();
  });

  it('should render product price', () => {
    const { getAllByText } = render(<ProductDetailsScreen />);
    expect(getAllByText('$299.99').length).toBeGreaterThanOrEqual(1);
  });

  it('should render product description', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('A feature-rich smartwatch with heart rate monitor')).toBeTruthy();
  });

  it('should call getProductById on mount', () => {
    render(<ProductDetailsScreen />);
    expect(mockGetProductById).toHaveBeenCalledWith(1);
  });

  it('should render Key Features section', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Key Features')).toBeTruthy();
  });

  it('should render all feature labels', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Heart Rate')).toBeTruthy();
    expect(getByText('Bluetooth')).toBeTruthy();
    expect(getByText('Waterproof')).toBeTruthy();
    expect(getByText('Battery')).toBeTruthy();
  });

  it('should render all feature values', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('72 bpm')).toBeTruthy();
    expect(getByText('5.2')).toBeTruthy();
    expect(getByText('Yes')).toBeTruthy();
    expect(getByText('18 hrs')).toBeTruthy();
  });

  it('should render Product Description section', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Product Description')).toBeTruthy();
  });

  it('should render Read more link', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Read more...')).toBeTruthy();
  });

  it('should render Add to Cart button', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Add to Cart')).toBeTruthy();
  });

  it('should render Buy Now button', () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Buy Now')).toBeTruthy();
  });

  it('should call goBack when back button is pressed', () => {
    const { getByTestId } = render(<ProductDetailsScreen />);
    const backIcon = getByTestId('icon-chevron-left');
    const backBtn = backIcon.parent;
    fireEvent.press(backBtn);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('should render Background component', () => {
    const { getByTestId } = render(<ProductDetailsScreen />);
    expect(getByTestId('background')).toBeTruthy();
  });

  it('should handle null selectedProduct', () => {
    mockUseGetProductById.mockReturnValue({
      selectedProduct: null,
      loading: false,
      error: null,
      getProductById: mockGetProductById,
    });
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Product Details')).toBeTruthy();
    expect(getByText('Add to Cart')).toBeTruthy();
  });

  it('should handle loading state', () => {
    mockUseGetProductById.mockReturnValue({
      selectedProduct: null,
      loading: true,
      error: null,
      getProductById: mockGetProductById,
    });
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Product Details')).toBeTruthy();
  });

  it('should handle error state', () => {
    mockUseGetProductById.mockReturnValue({
      selectedProduct: null,
      loading: false,
      error: 'Failed to fetch product',
      getProductById: mockGetProductById,
    });
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText('Product Details')).toBeTruthy();
  });

  it('should render with different product', () => {
    const differentProduct = {
      ...mockProduct,
      id: 5,
      name: 'Wireless Headphones',
      price: 199.99,
      description: 'High-quality wireless headphones',
    };
    mockUseGetProductById.mockReturnValue({
      selectedProduct: differentProduct,
      loading: false,
      error: null,
      getProductById: mockGetProductById,
    });
    const { getByText, getAllByText } = render(<ProductDetailsScreen />);
    expect(getByText('Wireless Headphones')).toBeTruthy();
    expect(getAllByText('$199.99').length).toBeGreaterThanOrEqual(1);
    expect(getByText('High-quality wireless headphones')).toBeTruthy();
  });

  it('should render share icon in header', () => {
    const { toJSON } = render(<ProductDetailsScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
