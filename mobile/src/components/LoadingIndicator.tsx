import React from 'react';
import { ActivityIndicator } from 'react-native';
import { atoms } from '../styles/atoms';
import { theme } from '../styles/theme';

export const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      size="large"
      color={theme.colors.cyan}
      style={[atoms.flex_1, atoms.justify_center, atoms.items_center]}
    />
  );
};
