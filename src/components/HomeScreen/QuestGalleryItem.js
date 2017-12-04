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
        <View style={[styles.itemContainer, { marginLeft: itemSpacing / 2, marginRight: itemSpacing / 2 }]}>
          <Animated.View style={styles.button}>
            <Image source={{ uri: image }} style={ styles.itemImage } />
          </Animated.View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },

  button: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  itemPlayable: {
    position: 'absolute',
    zIndex: 1,
    top: -(borderGap + borderWidth),
    left: -(borderGap + borderWidth),

    width: 80 + 2 * (borderGap + borderWidth),
    height: 80 + 2 * (borderGap + borderWidth),

    borderRadius: 80 + 2 * (borderGap + borderWidth),
    borderWidth: borderWidth,
    borderColor: 'white',
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
