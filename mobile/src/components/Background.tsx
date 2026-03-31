import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageAssets from '../assets/images';
import { theme } from '../styles/theme';

type IBackgroundStyles = {
  safeArea: ViewStyle;
  container: ViewStyle;
  background: ViewStyle;
};

export function Background({ children }: any) {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView
      style={[styles.safeArea, { height: height, backgroundColor: theme.colors.dark_100 }]}
      edges={['left', 'right', 'top']}
    >
      <ImageBackground
        source={ImageAssets.background_dot}
        resizeMode="repeat"
        style={styles.background}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<IBackgroundStyles>({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_100,
  },
});
