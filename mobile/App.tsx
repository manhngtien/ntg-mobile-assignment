import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogInScreen } from './src/screens/login-screen';
import MainNavigator from './src/screens/navigator/main-navigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { useAuth } from './src/features/auth/hooks/use-auth';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { LoadingIndicator } from './src/components/LoadingIndicator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, loading, fetchAuthUser } = useAuth();

  useEffect(() => {
    // Initialize authentication on app startup
    fetchAuthUser();
  }, [fetchAuthUser]);

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;