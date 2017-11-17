import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';



class QuestScreen extends Component{
  constructor(props) {
      super(props)
   }
   
   render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        McDonald
        McHalloween Party
      </Text>
      <Text style={styles.question}>
        Question 1
      </Text>
      <Text style={styles.description}>
        1+1=?
      </Text>
      <Button title={"Answer: 1"}
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("FailedScreen")}>
              <Text>Go Back</Text>
            </Button>
      <Button title={"Answer: 2"}
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("SuccessScreen")}>
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
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  question: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default QuestScreen
