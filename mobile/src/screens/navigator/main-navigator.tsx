// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../home-screen';
import { ProfileScreen } from '../profile-screen';
import { Image, StyleSheet, Text } from 'react-native';
import ListScreen from '../list-screen';
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
			}}
		>
			<Tab.Screen name="Home" component={HomeScreen} options={{
				tabBarLabel: 'Home',
				tabBarIcon: ({ color, size }) => (
					<Image source={require('../../assets/images/home.png')} style={styles.icon} />
				),
			}} />
			<Tab.Screen name="Tab3" component={ListScreen} options={{
				tabBarLabel: 'List',
				tabBarIcon: ({ color, size }) => (
					<Image source={require('../../assets/images/list.png')} style={styles.icon} />
				),

			}} />

			<Tab.Screen name="Profile" component={ProfileScreen} options={{
				tabBarLabel: 'Profile',
				tabBarLabelStyle: [
					atoms.font_medium,
					atoms.text_xs2,
					{ color: '#0DF2F2' }
				],
				tabBarIcon: () => (
					<FontAwesomeFreeSolid name='user' size={22} color={"#0DF2F2"} />
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