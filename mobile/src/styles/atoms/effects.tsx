import { StyleSheet, ViewStyle } from 'react-native';

type IEffects = {
  shadow_xs: ViewStyle;
  shadow_sm: ViewStyle;
  shadow_md: ViewStyle;
  shadow_lg: ViewStyle;
  shadow_xl: ViewStyle;
};

export const effects = StyleSheet.create<IEffects>({
  shadow_xs: {
    elevation: 1,
  },
  shadow_sm: {
    elevation: 2,
  },
  shadow_md: {
    elevation: 4,
  },
  shadow_lg: {
    elevation: 8,
  },
  shadow_xl: {
    elevation: 12,
  },
});
