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

import { locations } from '../data/locations'

import { updateQuest } from '../reducers/quests';

import SliderItem from './HomeScreen/SliderItem';


const { width } = Dimensions.get('window');
const { buttonWidth} = 50;
const { initScrollPosition } = (width/2) - (buttonWidth/2);

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

   updatePosition1 = () => {
    this.props.updateQuest(1);

    this.refs.scrollViewRef.scrollTo({x: -130, y: 0, animated: true})
   }

   scrollToPosition = () => {
    //this.refs.scrollViewRef.scrollTo({x: 662.5, y: 0, animated: true})
    this.refs.scrollViewRef.scrollTo({x: 200.5, y: 0, animated: true})
    //Alert.alert('this.scrollToPosition: ')
   }

   updateText = (event: Object) => {

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

    //if(this.state.scrollViewPosition > 662.5) {
    //  this.refs.scrollViewRef.scrollTo({x: 662.5, y: 0, animated: true})
    //}

   }
   
   
   //scrollToPosition = (event: Object, Integer: btnPos) => {
    //event.refs.scrollViewRef.scrollTo({x: 662.5, y: 0, animated: true})

  //}

  render() {

    let loctionList = locations.map(function(item, i){
      return (
          <SliderItem key={i} {...item} width={20} callback={ () => { alert("test") } }/>
        )
    })

    return (
      <View style={styles.container}>
        <View style={styles.content}> 
          <View style={styles.textContent}> 
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
            onScroll={this.updateText} 
            scrollEventThrottle={1} 
            decelerationRate={'fast'} 
            snapToInterval={115} 
            snapToAlignment={'center'} 
            contentOffset={{x: 215, y: 0}}
            showsHorizontalScrollIndicator={false}
            contentInset={{top: 0, left: 130, bottom: 0, right: 130}}
            >
              {loctionList}
              
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'orange',
  },
  scrollView: {

  },
  textContent: {
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
  bottomBar: {
    height: 50,
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)