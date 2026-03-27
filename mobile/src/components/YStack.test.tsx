import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

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

import { YStack } from './YStack';

describe('YStack', () => {
  it('should render children', () => {
    const { getByText } = render(<YStack><Text>Child</Text></YStack>);
    expect(getByText('Child')).toBeTruthy();
  });

  it('should accept gap prop', () => {
    const { getByText } = render(<YStack gap={16}><Text>Gap</Text></YStack>);
    expect(getByText('Gap')).toBeTruthy();
  });

  it('should accept p prop', () => {
    const { getByText } = render(<YStack p={3}><Text>Padding</Text></YStack>);
    expect(getByText('Padding')).toBeTruthy();
  });

  it('should accept style prop', () => {
    const { getByText } = render(<YStack style={{ flex: 1 }}><Text>Styled</Text></YStack>);
    expect(getByText('Styled')).toBeTruthy();
  });
});
