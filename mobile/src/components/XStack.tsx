import React from 'react';
import { View, ViewStyle } from 'react-native';

interface XStackProps {
  children: React.ReactNode;
  gap?: number;
  p?: number;
  style?: ViewStyle | ViewStyle[];
}

export const XStack: React.FC<XStackProps> = ({ children, gap = 0, p = 0, style }) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
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
