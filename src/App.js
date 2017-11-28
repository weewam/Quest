/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Button
} from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './Store';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import QuestScreen from './components/HomeScreen/QuestScreen'
import SuccessScreen from './components/HomeScreen/SuccessScreen'
import FailedScreen from './components/HomeScreen/FailedScreen'
import CreateScreen from './components/HomeScreen/CreateScreen'
import FindScreen from './components/HomeScreen/FindScreen'
import ReputationScreen from './components/HomeScreen/ReputationScreen'
import SettingsScreen from './components/HomeScreen/SettingsScreen'


const { persistor, store } = configureStore()

export default class App extends Component<{}> {

  render() {
    return (
      <Provider store={ store }>
        <PersistGate persistor={ persistor }>
          <View style={ styles.container }>
            <RootNavigator/>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

/*const RootNavigator = StackNavigator({
  {Home: {
    screen: HomeScreen,
  },
  SecondScreen: {
    screen: SecondScreen,
  },},
  { headerMode: 'screen' }
});*/
const RootNavigator = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    QuestScreen: { screen: QuestScreen},
    SuccessScreen: {screen: SuccessScreen},
    FailedScreen: {screen: FailedScreen},
    CreateScreen: {screen: CreateScreen},
    FindScreen: {screen: FindScreen},
    ReputationScreen: {screen: ReputationScreen},
    SettingsScreen: {screen: SettingsScreen}
  },
  { headerMode: 'modal' }
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
