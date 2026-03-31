import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { atoms } from '../styles/atoms';
import { theme } from '../styles/theme';

export function CheckBox() {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable onPress={() => setChecked(!checked)}>
      <View
        style={[atoms.justify_center, atoms.items_center, styles.box, checked && styles.checked]}
      >
        <FontAwesomeFreeSolid name="check" size={10} color={theme.colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray_200,
    borderRadius: 4,
  },
  checked: {
    backgroundColor: theme.colors.cyan,
  },
});
