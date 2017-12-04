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

const borderGap = 5;
const borderWidth = 3;

export default class QuestGalleryItem extends Component {
  constructor(props) {
    super(props)
  }

  onPress() {
    alert("do something")
  }

  render() {
    let { itemDimension, itemSpacing, image, playable, selected, eventLocation } = this.props;

    return (
      <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.onPress.bind(this)}>
        <View style={styles.button}>
          <Image source={{ uri: image }} style={ styles.itemImage } />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    position: 'relative',
    width: 80,
    height: 80,
    flexShrink: 0,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,

    overflow: 'hidden',
  },
  itemText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
