import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';



class SuccessScreen extends Component{
  constructor(props) {
      super(props)
   }
   render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        THIS IS THE Success Screen
      </Text>
      <Button title={"Go back"}
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("HomeScreen")}>
              <Text>Go Back</Text>
            </Button>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(215, 150, 140)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default SuccessScreen
