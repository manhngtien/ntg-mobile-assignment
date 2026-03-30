import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { useAuth } from './src/features/auth/hooks/use-auth';
import store from './src/redux/store';
import { LogInScreen } from './src/screens/login-screen';
import MainNavigator from './src/screens/navigator/main-navigator';
import { ProductDetailsScreen } from './src/screens/product-details-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, error, fetchAuthUser } = useAuth();

  useEffect(() => {
    fetchAuthUser();
  }, [fetchAuthUser]);

  useEffect(() => {
    error && ToastAndroid.show(error, ToastAndroid.LONG);
  }, [error]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
