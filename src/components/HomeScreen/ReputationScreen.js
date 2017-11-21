import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';



class ReputationScreen extends Component{
  constructor(props) {
      super(props)
   }
   render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        This is reputation screen
      </Text>
      <Button title={"Go Back"}
        style={{ marginTop: 10 }}
        onPress={() => this.props.navigation.navigate("HomeScreen")}>
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

export default ReputationScreen
