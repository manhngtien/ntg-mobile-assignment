import { render } from '@testing-library/react-native';
import React from 'react';

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
    default: ({ name, color, size }: any) =>
      React.createElement(
        Text,
        { testID: `icon-${name}-${color}`, style: { fontSize: size } },
        name,
      ),
  };
});

jest.mock('../styles/theme', () => ({
  theme: {
    colors: {
      yellow: '#FACC15',
      gray_200: '#D1D5DB',
      gray_500: '#6B7280',
    },
  },
}));

jest.mock('../styles/atoms', () => ({
  atoms: new Proxy({}, { get: (_t: any, p: string) => ({ _atomName: p }) }),
}));

import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('should render 5 star icons', () => {
    const { getAllByText } = render(<StarRating rating={3} />);
    expect(getAllByText('star').length).toBe(5);
  });

  it('should render the rating number', () => {
    const { getByText } = render(<StarRating rating={3} />);
    expect(getByText('3')).toBeTruthy();
  });

  it('should render rating with decimal', () => {
    const { getByText } = render(<StarRating rating={4.5} />);
    expect(getByText('4.5')).toBeTruthy();
  });

  it('should render 5 yellow stars for rating 5', () => {
    const { getAllByTestId } = render(<StarRating rating={5} />);
    const yellowStars = getAllByTestId(`icon-star-${'#FACC15'}`);
    expect(yellowStars.length).toBe(5);
  });

  it('should render all stars for rating 0', () => {
    const { getAllByText } = render(<StarRating rating={0} />);
    const stars = getAllByText('star');
    expect(stars.length).toBe(5);
  });

  it('should render 3 yellow and 2 gray stars for rating 3', () => {
    const { getAllByText } = render(<StarRating rating={3} />);
    const stars = getAllByText('star');
    expect(stars.length).toBe(5);
  });

  it('should render 1 yellow and 4 gray stars for rating 1', () => {
    const { getAllByText } = render(<StarRating rating={1} />);
    const stars = getAllByText('star');
    expect(stars.length).toBe(5);
  });

  it('should render with rating 0', () => {
    const { getByText } = render(<StarRating rating={0} />);
    expect(getByText('0')).toBeTruthy();
  });

  it('should render with rating 2.5', () => {
    const { getByText } = render(<StarRating rating={2.5} />);
    expect(getByText('2.5')).toBeTruthy();
  });
});
