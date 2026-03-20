import React from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import ImageAssets from '../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';

type IBackgroundStyles = {
	safeArea: ViewStyle;
	container: ViewStyle;
	text: TextStyle;
	background: ViewStyle;
};


export default function Background({ children }: any) {
	return (
		<SafeAreaView style={styles.safeArea}>
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
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F9FAFB',
	},
	text: {
		fontSize: 14,
		color: '#374151',
	},
});