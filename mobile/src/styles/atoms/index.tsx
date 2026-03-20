import { StyleSheet } from "react-native";
import { spacings } from "./spacings";
import { flex } from "./flex";
import { borders } from "./borders";
import { sizings } from "./sizings";
import { effects } from "./effects";
import { fonts } from "./fonts";

type IAtomGlobalStyles =
  typeof sizings
  & typeof spacings
  & typeof flex
  & typeof borders
  & typeof effects
  & typeof fonts;

export const atoms = StyleSheet.create<IAtomGlobalStyles>({
  ...sizings,
  ...spacings,
  ...flex,
  ...borders,
  ...effects,
  ...fonts
});