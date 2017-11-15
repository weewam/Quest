import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Alert,
  AlertIOS,
  Picker,
  Dimensions,
  Button,
  Integer
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Variables
import { locations } from '../data/locations'

//Reducers
import { updateQuest } from '../reducers/quests';

//Components
import Background from '../components/Backgrounds/Background1'
import SliderItem from './HomeScreen/SliderItem';



const WIDTH = Dimensions.get('window').width,
      HEIGHT = Dimensions.get('window').height;

const { buttonWidth} = 50;
const { initScrollPosition } = (WIDTH/2) - (buttonWidth/2);



const mapStateToProps = state => ({
  quests: state.quests,
  selectedQuest: state.selectedQuest,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateQuest,
}, dispatch)

class HomeScreen extends Component {
  constructor() {
      super()
      this.state = {
         scrollViewPosition: 50,
         buttonIndex: 3
      }
   }


   updatePosition1() {
    this.props.updateQuest(1);

    this.refs.scrollViewRef.scrollTo({x: -130, y: 0, animated: true})
   }


   scrollToPosition() {
    //this.refs.scrollViewRef.scrollTo({x: 662.5, y: 0, animated: true})
    this.refs.scrollViewRef.scrollTo({x: 200.5, y: 0, animated: true})
    //Alert.alert('this.scrollToPosition: ')
   }


   updateText(event) {

    this.setState({scrollViewPosition: event.nativeEvent.contentOffset.x})

    var scrollIndex = Math.ceil((event.nativeEvent.contentOffset.x + 200 - 72.5 + 57.5)/115)
    
    if (scrollIndex == 1) {
      this.setState({buttonIndex: 1}) 
    } else if (scrollIndex == 2) {
      this.setState({buttonIndex: 2}) 
    } else if (scrollIndex == 3) {
      this.setState({buttonIndex: 3}) 
    } else if (scrollIndex == 4) {
      this.setState({buttonIndex: 4}) 
    } else if (scrollIndex == 5) {
      this.setState({buttonIndex: 5}) 
    } else if (scrollIndex == 6) {
      this.setState({buttonIndex: 6}) 
    } else if (scrollIndex == 7) {
      this.setState({buttonIndex: 7}) 
    }

   }


  render() {

    let loctionList = locations.map(function(item, i){
      return (
          <SliderItem key={i} {...item} width={20} callback={ () => { alert("test") } }/>
        )
    })

    return (
      <View style={styles.outerContainer}>
        <View style={ styles.background }>
          <Background width={ WIDTH + 10 }/>
        </View>

        <View style={styles.innerContainer}>

          <View style={styles.content}> 
            <Text style={styles.welcome}>
              {"Button "}{this.state.buttonIndex}{" is selected."}
            </Text>
            <Text style={styles.instructions}>
              {"position: "}{this.state.scrollViewPosition}
            </Text>
          </View>

          <View style={styles.scrollView}>
            <ScrollView
              ref='scrollViewRef'
              horizontal={true} 
              onScroll={this.updateText.bind(this)} 
              scrollEventThrottle={1} 
              decelerationRate={'fast'} 
              snapToInterval={115} 
              snapToAlignment={'center'} 
              contentOffset={{x: 215, y: 0}}
              showsHorizontalScrollIndicator={false}
              contentInset={{top: 0, left: 130, bottom: 0, right: 130}}
            >
              { loctionList }
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgb(215, 150, 140)',
  },

  background: { 
    position: 'absolute', 
    bottom : 0,
    left : -10,
  },

  innerContainer: {
    flex: 1,
  },


  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },


  scrollImages: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white'

  },
  scrollButton: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 25,
  },
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
  scrollText: {
    backgroundColor: 'blue',
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)