import React from 'react';
import { View, ViewStyle } from 'react-native';
import { atoms } from '../styles/atoms';

interface YStackProps {
  children: React.ReactNode;
  gap?: number;
  p?: number;
  style?: ViewStyle | ViewStyle[];
}

export const YStack: React.FC<YStackProps> = ({ children, gap = 0, p = 0, style }) => {
  return (
    <View
      style={[
        atoms.w_full,
        {
          flexDirection: 'column',
          gap,
          padding: p * 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
