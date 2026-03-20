import { StyleSheet, TextStyle } from "react-native";

type IFontStyles = {
  text_xs: TextStyle;
  text_sm: TextStyle;
  text_base: TextStyle;
  text_lg: TextStyle;
  text_xl: TextStyle;
  text_xl2: TextStyle;
  text_xl3: TextStyle;
  font_light: TextStyle;
  font_normal: TextStyle;
  font_medium: TextStyle;
  font_semibold: TextStyle;
  font_bold: TextStyle;
  font_extrabold: TextStyle;
};

export const fonts = StyleSheet.create<IFontStyles>({
  text_xs: {
    fontSize: 12,
  },
  text_sm: {
    fontSize: 14,
  },
  text_base: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
  text_xl: {
    fontSize: 20,
  },
  text_xl2: {
    fontSize: 24,
  },
  text_xl3: {
    fontSize: 30,
  },
  font_light: {
    fontWeight: '300',
  },
  font_normal: {
    fontWeight: '400',
  },
  font_medium: {
    fontWeight: '500',
  },
  font_semibold: {
    fontWeight: '600',
  },
  font_bold: {
    fontWeight: '700',
  },
  font_extrabold: {
    fontWeight: '800',
  },
});
