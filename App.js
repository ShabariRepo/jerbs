import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './store'; // no need to specify index.js

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  render() {
    // create the first navigator
    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: {
                screen: ReviewScreen
              },
              settings: { screen: SettingsScreen }
            }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <Icon
                  name="favorite"
                  size={30}//name="bookmark"
                  color={tintColor}
                />
              )
            })
          }
        }, {
          tabBarPosition: 'bottom',
          //swipeEnabled: false, // this makes the android feature where you can swipe between tabs (didnt happen on android 6 for us but ok)
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
        // by default react Navigation React Native Nav will render all the screens passed in above
        // so this is why FB nav function fires even on the welcome screen
        // so lazy load and disable eager loading
        navigationOptions: {
          tabBarVisible: false
        },
        lazy: true
      });

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}