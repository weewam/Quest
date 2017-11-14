/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider , connect} from 'react-redux';
import store from './Store';
import HomeScreen from './components/HomeScreen';


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={ store }>
        <View style={ styles.container }>
          <HomeScreen/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
