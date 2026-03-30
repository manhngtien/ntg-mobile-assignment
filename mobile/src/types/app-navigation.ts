import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ProductDetails: { id: number };
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;