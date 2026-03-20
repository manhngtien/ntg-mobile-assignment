import { StyleSheet, ViewStyle } from "react-native";

type ISizingStyles = {
  // Height
  h_0: ViewStyle;
  h_1: ViewStyle;
  h_2: ViewStyle;
  h_3: ViewStyle;
  h_4: ViewStyle;
  h_5: ViewStyle;
  h_6: ViewStyle;
  h_7: ViewStyle;
  h_8: ViewStyle;
  h_9: ViewStyle;
  h_10: ViewStyle;
  h_11: ViewStyle;
  h_12: ViewStyle;
  h_16: ViewStyle;
  h_full: ViewStyle;

  // Width
  w_0: ViewStyle;
  w_1: ViewStyle;
  w_2: ViewStyle;
  w_3: ViewStyle;
  w_4: ViewStyle;
  w_5: ViewStyle;
  w_6: ViewStyle;
  w_7: ViewStyle;
  w_8: ViewStyle;
  w_9: ViewStyle;
  w_10: ViewStyle;
  w_11: ViewStyle;
  w_12: ViewStyle;
  w_16: ViewStyle;
  w_full: ViewStyle;
};

export const sizings = StyleSheet.create<ISizingStyles>({
  // Height
  h_0: { height: 0 },
  h_1: { height: 4 },
  h_2: { height: 8 },
  h_3: { height: 12 },
  h_4: { height: 16 },
  h_5: { height: 20 },
  h_6: { height: 24 },
  h_7: { height: 28 },
  h_8: { height: 32 },
  h_9: { height: 36 },
  h_10: { height: 40 },
  h_11: { height: 44 },
  h_12: { height: 48 },
  h_16: { height: 64 },
  h_full: {
    height: '100%',
  },

  // Width
  w_0: { width: 0 },
  w_1: { width: 4 },
  w_2: { width: 8 },
  w_3: { width: 12 },
  w_4: { width: 16 },
  w_5: { width: 20 },
  w_6: { width: 24 },
  w_7: { width: 28 },
  w_8: { width: 32 },
  w_9: { width: 36 },
  w_10: { width: 40 },
  w_11: { width: 44 },
  w_12: { width: 48 },
  w_16: { width: 64 },
  w_full: {
    width: '100%',
  },
});