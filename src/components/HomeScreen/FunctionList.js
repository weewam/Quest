import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Easing,
  Animated,
} from 'react-native';

export default class FunctionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigator: this.props.navigator
    }
  }

  onPress(action) {
    switch(action){
      case "Profile":
      case "Store":
        return this.state.navigator.navigate("HomeScreen");
      case "Create":
        return this.state.navigator.navigate("CreateScreen");
      case "Find":
        return this.state.navigator.navigate("FindScreen");
      case "Reputation":
        return this.state.navigator.navigate("ReputationScreen");
      case "Settings":
        return this.state.navigator.navigate("SettingsScreen");

    }
  }

  render() {

    return (
      <View>
      <TouchableHighlight underlayColor='#ffb6c1' onPress={this.onPress.bind(this, "Profile")}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='#ffb6c1' onPress={this.onPress.bind(this, "Store")}>
        <Text style={styles.buttonText}>Store</Text>
      </TouchableHighlight>
      <View style={{margin:15}}></View>
      <TouchableHighlight underlayColor='#ffb6c1' onPress={this.onPress.bind(this, "Create")}>
        <Text style={styles.buttonText}>Create a Quest</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='#ffb6c1' onPress={this.onPress.bind(this, "Find")}>
        <Text style={styles.buttonText}>Find a secret Quest</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='#ffb6c1' onPress={this.onPress.bind(this, "Reputation")}>
        <Text style={styles.buttonText}>Reputation</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='#ffb6c1' onPress={this.onPress.bind(this, "Stettings")}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: 'white',
    flexDirection: 'row',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center'
  }
});
