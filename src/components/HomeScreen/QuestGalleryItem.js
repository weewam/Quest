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

import Star from '../Icons/Star'

export default class QuestGalleryItem extends Component {
  constructor(props) {
    super(props)
  }

  onPress() {
    alert("do something")
  }


  render() {
    let { itemDimension, itemSpacing, image, playable, selected, eventLocation, starNumber, stars } = this.props;
    const showStars = [1,2,3].map(
      function(i) {
        if(!stars){
          return (
            <Star key={i} width={10} color={ '#CDD7E1' }/>
          )
        }
        console.log(starNumber)
        if(i <= starNumber){
          return (
            <Star key={i} width={10} color={ '#FFE16E' }/>
          )
        } else {
          return (
            <Star key={i} width={10} color={ '#CDD7E1' }/>
          )
        }
      })
    return (
      <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.onPress.bind(this)}>
        <View style={styles.button}>
          <Image source={{ uri: image }} style={ styles.itemImage } />

          <View style={styles.starContainer}>
            {showStars}
          </View>
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
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,

    overflow: 'hidden',

    borderColor: '#FFF',
    borderWidth: 2,
  },
  itemText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  starContainer: {
    position: 'absolute',
    bottom: -5,

    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: '#FFF',
    borderRadius: 20,
    width: 60,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 9,
  },
});

// export default connect(mapStateToProps)(QuestGalleryItem)
