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
import { Provider , connect} from 'react-redux';
import store from './Store';
import HomeScreen from './components/HomeScreen';
import { StackNavigator } from 'react-navigation';
import QuestScreen from './components/HomeScreen/QuestScreen'
import SuccessScreen from './components/HomeScreen/SuccessScreen'
import FailedScreen from './components/HomeScreen/FailedScreen'

export default class App extends Component<{}> {

  render() {
    return (
      <Provider store={ store }>
        <View style={ styles.container }>
          <RootNavigator/>
        </View>
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
    FailedScreen: {screen: FailedScreen}
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
