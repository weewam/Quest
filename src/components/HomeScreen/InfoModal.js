import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';



class InfoModal extends Component{
  constructor(props) {
      super(props)
  }
  render() {
    const {selectedQuest} = this.props;
    return (
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}> About {selectedQuest.name} </Text>
        <Text style={styles.aboutText}>
          {selectedQuest.about}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  aboutContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  },
  aboutText: {
    color: 'white',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
  },
  aboutTitle: {
    color: 'white',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,

  },
});

export default InfoModal
