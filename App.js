import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
  render() {
    // create the first navigator
    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
    });

    return (
      <View>
        <MainNavigator />
      </View>
    );
  }
}