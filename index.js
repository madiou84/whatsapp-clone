import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider } from 'react-native-paper';

import App from './src/routes';
import { name as appName } from './app.json';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};
  
export default function Main() {
  return (
    <NavigationContainer>
      <Provider theme={theme}>
        <App />
      </Provider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
