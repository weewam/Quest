import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';


export default class SliderItem extends Component {
  constructor(props) {
      super(props)

      this.state = {
         scrollViewPosition: 50,
         buttonIndex: 3
      }
   }

   onPress() {
    this.props.callback();
   }

  render() {
    let {image} = this.props
    return (     
      <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={ this.onPress.bind(this) }>
        <View style={styles.outerScrollButton} borderWidth={0}>
          <View ref='firstButton' width={95} height={95} borderRadius={47.5} borderWidth={0} borderColor={'white'}>
            <Image source={{uri: image}} style={styles.innerScrollButton} />
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}></Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  innerScrollButton: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 5,
    marginLeft: 4.5,
    marginTop: 4.5,
    marginBottom: 5,
  },
  outerScrollButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
});