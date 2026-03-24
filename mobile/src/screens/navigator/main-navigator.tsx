// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../home-screen';
import { ProfileScreen } from '../profile-screen';
import { Image, StyleSheet, Text } from 'react-native';
import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { atoms } from '../../styles/atoms';

const Tab = createBottomTabNavigator();

interface IMainNavigator {
	navigation: any
}

const MainNavigator: React.FC<IMainNavigator> = ({ navigation }) => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#0DF2F2",
				tabBarInactiveTintColor: "#94A3B8"
			}}
		>
			<Tab.Screen name="Home" component={HomeScreen} options={{
				tabBarLabel: 'Home',
				tabBarLabelStyle: [
					atoms.font_medium,
					atoms.text_xs2,
				],
				tabBarIcon: ({ color }) => (
					<FontAwesomeFreeSolid name='home' size={22} color={color} />
				),
			}} />

			<Tab.Screen name="Profile" component={ProfileScreen} options={{
				tabBarLabel: 'Profile',
				tabBarLabelStyle: [
					atoms.font_medium,
					atoms.text_xs2,
				],
				tabBarIcon: ({ color }) => (
					<FontAwesomeFreeSolid name='user' size={22} color={color} />
				),
			}} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 24,
	},
});

export default MainNavigator;