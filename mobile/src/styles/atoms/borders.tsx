import { StyleSheet, ViewStyle } from "react-native";

type IBorderStyles = {
  // Border widths
  border_none: ViewStyle;
  border_sm: ViewStyle;
  border_md: ViewStyle;
  border_lg: ViewStyle;

  // Border radius
  rounded_xs: ViewStyle;
  rounded_sm: ViewStyle;
  rounded_md: ViewStyle;
  rounded_lg: ViewStyle;
  rounded_xl: ViewStyle;
  rounded_2xl: ViewStyle;
  rounded_3xl: ViewStyle;
  rounded_4xl: ViewStyle;
  rounded_none: ViewStyle;
  rounded_full: ViewStyle;
};

export const borders = StyleSheet.create<IBorderStyles>({
  // Border widths
  border_none: {
    borderWidth: 0,
  },
  border_sm: {
    borderWidth: 1,
  },
  border_md: {
    borderWidth: 2,
  },
  border_lg: {
    borderWidth: 4,
  },

  // Border radius
  rounded_xs: {
    borderRadius: 2,
  },
  rounded_sm: {
    borderRadius: 4,
  },
  rounded_md: {
    borderRadius: 6,
  },
  rounded_lg: {
    borderRadius: 8,
  },
  rounded_xl: {
    borderRadius: 12,
  },
  rounded_2xl: {
    borderRadius: 16,
  },
  rounded_3xl: {
    borderRadius: 24,
  },
  rounded_4xl: {
    borderRadius: 32,
  },
  rounded_none: {
    borderRadius: 0,
  },
  rounded_full: {
    borderRadius: 999,
  },
});
