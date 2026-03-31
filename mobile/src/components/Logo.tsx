import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import React from 'react';
import { Text, View } from 'react-native';
import { atoms } from '../styles/atoms';
import { theme } from '../styles/theme';

export function Logo() {
  return (
    <View
      style={[
        atoms.rounded_full,
        atoms.h_16,
        atoms.w_16,
        atoms.items_center,
        atoms.justify_center,
        {
          backgroundColor: theme.colors.cyan_100,
        },
      ]}
    >
      <Text>
        <FontAwesomeFreeSolid name="shopping-bag" size={32} color={theme.colors.cyan} />
      </Text>
    </View>
  );
}
