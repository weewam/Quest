/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import ScrollPicker from 'react-native-picker-scrollview';


const { width } = Dimensions.get('window');
const { buttonWidth} = 50;
const { initScrollPosition } = (width/2) - (buttonWidth/2);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const showAlert = () => {
  Alert.alert(
     'This feature is\nnot implemented yet'
  )
  console.log('This feature is\nnot implemented yet');
}

const showNumber = () => {
  Alert.alert(
      {} + 'AAA'
    )
}
const handleScroll = (event: Object) => {
  //scrollViewPosition = event.nativeEvent.contentOffset.x;
  Alert.alert(
     //scrollViewPosition = event.nativeEvent.contentOffset.x + ''
  )
}


export default class App extends Component<{}> {
  

  constructor() {
      super()
      this.state = {
         scrollViewPosition: 50,
         buttonIndex: 3
      }
   }

   updatePosition1 = () => {
    this.refs.scrollViewRef.scrollTo({x: -130, y: 0, animated: true})
   }
   updatePosition2 = () => {
    this.refs.scrollViewRef.scrollTo({x: -15, y: 0, animated: true})
   }
   updatePosition3 = () => {
    this.refs.scrollViewRef.scrollTo({x: 100, y: 0, animated: true})
   }
   updatePosition4 = () => {
    this.refs.scrollViewRef.scrollTo({x: 215, y: 0, animated: true})
   }
   updatePosition5 = () => {
    this.refs.scrollViewRef.scrollTo({x: 330, y: 0, animated: true})
   }
   updatePosition6 = () => {
    this.refs.scrollViewRef.scrollTo({x: 445, y: 0, animated: true})
   }
   updatePosition7 = () => {
    this.refs.scrollViewRef.scrollTo({x: 560, y: 0, animated: true})
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
            <Text style={styles.instructions}>
              {instructions}
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
              
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.updatePosition1}>
                <View style={styles.outerScrollButton} borderWidth={0}>
                  <View ref='firstButton' width={95} height={95} borderRadius={47.5} borderWidth={0} borderColor={'white'}>
                    <View style={styles.innerScrollButton} >
                    </View>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}></Text>
                </View>
              </TouchableHighlight>
              
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.updatePosition2}>
                <View style={styles.outerScrollButton} >
                  <View ref='secondButton' width={95} height={95} borderRadius={47.5} borderWidth={0} borderColor={'white'}>
                    <View style={styles.innerScrollButton} >
                    </View>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}></Text>
                </View>
              </TouchableHighlight>
              
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.updatePosition3} flexDirection={'column'} >
                <View style={styles.outerScrollButton}>
                  <View ref='thirdButton' width={95} height={95} borderRadius={47.5} borderWidth={3} borderColor={'white'}>
                    <View style={styles.innerScrollButton} >
                    </View>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>3.1km</Text>
                </View>
              </TouchableHighlight>
              


              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.updatePosition4} flexDirection={'column'} >
                <View style={styles.outerScrollButton}>
                  <View ref='thirdButton' width={95} height={95} borderRadius={47.5} borderWidth={3} borderColor={'white'}>
                    <View style={styles.innerScrollButton} >
                    </View>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>{'<'}100m</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.updatePosition5} flexDirection={'column'} >
                <View style={styles.outerScrollButton}>
                  <View ref='thirdButton' width={95} height={95} borderRadius={47.5} borderWidth={3} borderColor={'white'}>
                    <View style={styles.innerScrollButton} >
                    </View>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>890m</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.updatePosition6} flexDirection={'column'} >
                <View style={styles.outerScrollButton}>
                  <View ref='thirdButton' width={95} height={95} borderRadius={47.5} borderWidth={0} borderColor={'white'}>
                    <View style={styles.innerScrollButton} >
                    </View>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}></Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={this.updatePosition7} flexDirection={'column'} >
                <View style={styles.outerScrollButton}>
                  <View ref='thirdButton' width={95} height={95} borderRadius={47.5} borderWidth={0} borderColor={'white'}>
                    <View style={styles.innerScrollButton} >
                    </View>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}></Text>
                </View>
              </TouchableHighlight>
              
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
