import React from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, TextStyle, useWindowDimensions, ViewStyle } from 'react-native';
import ImageAssets from '../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';

type IBackgroundStyles = {
	safeArea: ViewStyle;
	container: ViewStyle;
	background: ViewStyle;
};


export default function Background({ children }: any) {
	const { height } = useWindowDimensions();

	return (
		<SafeAreaView
			style={[
				styles.safeArea,
				{ height: height, backgroundColor: '#1F2937' }
			]}
			edges={['left', 'right', 'top']}
		>
			<ImageBackground
				source={ImageAssets.background_dot}
				resizeMode="repeat"
				style={styles.background}>
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
		backgroundColor: '#F9FAFB',
	}
});