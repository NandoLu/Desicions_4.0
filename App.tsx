import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './app/Menu';
import NovoJogo from './app/NovoJogo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Menu" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Menu" 
          component={Menu}
        />
        <Stack.Screen 
          name="NovoJogo" 
          component={NovoJogo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
