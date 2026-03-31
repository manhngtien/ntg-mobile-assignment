// src/navigation/MainNavigator.tsx
import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { atoms } from '../../styles/atoms';
import { theme } from '../../styles/theme';
import { HomeScreen } from '../home-screen';
import { ProfileScreen } from '../profile-screen';

const Tab = createBottomTabNavigator();

interface IMainNavigator {
  navigation: any;
}

const MainNavigator: React.FC<IMainNavigator> = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.cyan,
        tabBarInactiveTintColor: theme.colors.slate_400,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: [atoms.font_medium, atoms.text_xs2],
          tabBarIcon: ({ color }) => <FontAwesomeFreeSolid name="home" size={22} color={color} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: [atoms.font_medium, atoms.text_xs2],
          tabBarIcon: ({ color }) => <FontAwesomeFreeSolid name="user" size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
