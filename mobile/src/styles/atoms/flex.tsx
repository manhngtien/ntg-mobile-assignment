import { StyleSheet, ViewStyle } from "react-native";

type IFlexStyles = {
  flex_1: ViewStyle;
  flex_row: ViewStyle;
  flex_col: ViewStyle;
  justify_center: ViewStyle;
  justify_between: ViewStyle;
  items_center: ViewStyle;
  items_start: ViewStyle;
  items_end: ViewStyle;
};

export const flex = StyleSheet.create<IFlexStyles>({
  flex_1: {
    flex: 1,
  },
  flex_row: {
    flexDirection: 'row',
  },
  flex_col: {
    flexDirection: 'column',
  },
  justify_center: {
    justifyContent: 'center',
  },
  justify_between: {
    justifyContent: 'space-between',
  },
  items_center: {
    alignItems: 'center',
  },
  items_start: {
    alignItems: 'flex-start',
  },
  items_end: {
    alignItems: 'flex-end',
  },
});
