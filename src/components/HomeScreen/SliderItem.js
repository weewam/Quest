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
import { distanceFromPhone } from '../../MapUtils'

const borderGap = 5;
const borderWidth = 3;

export default class SliderItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedAnim: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this.state.selectedAnim, {
      ease: Easing.bezier(.36, .07, .19, .97),
      toValue: nextProps.selected,
      duration: 200,
    }).start();
  }

  onPress() {
    this.props.callback();
  }

  render() {
    let { itemDimension, itemSpacing, image, playable, selected, phoneLocation, eventLocation } = this.props;
    let { selectedAnim } = this.state;
    
    let distance = Math.floor(distanceFromPhone(phoneLocation, eventLocation) * 10) / 10
    
    let outerCircleDimension = itemDimension + 2 * (borderGap + borderWidth);

    let playableCircle = null;
    if (playable) {
      playableCircle = <View style={[styles.itemPlayable, { width: outerCircleDimension, height: outerCircleDimension, borderRadius: outerCircleDimension / 2 }]} />
    }

    let itemText = <Text style={styles.itemText}>{ `${ distance } km`}</Text>;
    if (selected) {
      let opacity = (playable) ? 1 : 0.8;
      itemText = <Text style={ [styles.itemText, { position: 'relative', top: 15, opacity: opacity }] }>Play</Text>
    }

    let scaleInterpolation = selectedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.3]
    })

    return (
      <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.onPress.bind(this)}>
        <View style={[styles.itemContainer, { marginLeft: itemSpacing / 2, marginRight: itemSpacing / 2 }]}>
          <Animated.View style={[styles.button, { width: itemDimension, height: itemDimension, transform: [{ scale: scaleInterpolation }] }]}>
            {playableCircle}
            <Image source={{ uri: image }} style={[styles.itemImage, { width: itemDimension, height: itemDimension, borderRadius: itemDimension / 2 }]} />
          </Animated.View>

          { itemText }
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
