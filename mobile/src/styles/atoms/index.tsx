import { StyleSheet } from 'react-native';
import { borders } from './borders';
import { effects } from './effects';
import { flex } from './flex';
import { fonts } from './fonts';
import { sizings } from './sizings';
import { spacings } from './spacings';

type IAtomGlobalStyles = typeof sizings &
  typeof spacings &
  typeof flex &
  typeof borders &
  typeof effects &
  typeof fonts;

export const atoms = StyleSheet.create<IAtomGlobalStyles>({
  ...sizings,
  ...spacings,
  ...flex,
  ...borders,
  ...effects,
  ...fonts,
});
