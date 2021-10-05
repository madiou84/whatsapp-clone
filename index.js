import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors, DefaultTheme, Provider } from 'react-native-paper';

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
      <SafeAreaView style={{ flex: 1 }}>
        <Provider theme={theme}>
          <StatusBar
              animated
              barStyle="light-content"
              backgroundColor={Colors.teal900}
          />

          <App />
        </Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
