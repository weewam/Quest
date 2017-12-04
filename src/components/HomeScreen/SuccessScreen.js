import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { locations } from '../../data/locations';

import {
  updateFinalScore
} from '../../reducers/score'

const WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height,
  IMAGE_SIZE = WIDTH*0.7,
  STARSIZE = IMAGE_SIZE*0.1

const mapStateToProps = state => ({
  selectedQuestIndex: state.quests.selectedQuest,
  // todo: save scores and stars to memory
  currentScore: state.score.currentScore,
  currentStar: state.score.currentStar,
  totalScore: state.score.totalScore
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateFinalScore
}, dispatch)




class SuccessScreen extends Component{
  constructor(props) {
      super(props)
   }
   render() {
    const { selectedQuestIndex } = this.props
    const selectedQuest = locations[selectedQuestIndex];
    var stars = 
    (
      <View style={styles.horisontalLayout}>
        <Image source={require('../../icons/yellow-star.png')} style={[styles.star, { width: 50, height: 50 }]}/>
      </View>
    )
    if(this.props.currentStar === 1) {
      stars = (
        <View style={styles.horisontalLayout}>
          <Image source={require('../../icons/yellow-star.png')} style={[styles.star, { width: 50, height: 50 }]}/>
        </View>
      )
    } else if(this.props.currentStar === 2) {
      stars = (
        <View style={styles.horisontalLayout}>
          <Image source={require('../../icons/yellow-star.png')} style={[styles.star, { width: 50, height: 50 }]}/>
          <Image source={require('../../icons/yellow-star.png')} style={[styles.star, { width: 50, height: 50 }]}/>
        </View>
      )
    } else if(this.props.currentStar === 3) {
      stars = (
        <View style={styles.horisontalLayout}>
          <Image source={require('../../icons/yellow-star.png')} style={[styles.star, { width: 50, height: 50 }]}/>
          <Image source={require('../../icons/yellow-star.png')} style={[styles.star, { width: 50, height: 50 }]}/>
          <Image source={require('../../icons/yellow-star.png')} style={[styles.star, { width: 50, height: 50 }]}/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedQuest.image }} style={[styles.itemImage, { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 }]} />
        <Text style={styles.bigText}>
          Congtratz!
        </Text>
        <Text style={styles.text}>
          You got {this.props.currentScore} points from this quest
        </Text>
        <Text style={styles.text}>
          and you earned
        </Text>
        { stars }
        <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => this.props.navigation.navigate("HomeScreen")}>
            <View>
              <Text style={styles.backButton}>Finish quest</Text>
            </View>
          </TouchableHighlight>
        <Text style={styles.text}>
          Your total score is {this.props.totalScore}
        </Text>
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
  text: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  bigText: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  backButton:  {
    fontSize: 20,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    padding: 7.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 20,

  },
  star: {
    margin: 5,
  },
  horisontalLayout: {
    flexDirection: 'row',

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessScreen)
