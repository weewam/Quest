import React, { Component } from 'react';
import {
  AppRegistry,
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
  Integer,
  PermissionsAndroid,
} from 'react-native';

import Geocoder from 'react-native-geocoding';

import { distanceFromPhone } from '../MapUtils'
import { StackNavigator } from 'react-navigation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Imported variables
import { locations } from '../data/locations'

//Actions
import { setPosition } from '../reducers/position';
import {
  setQuest,
  setFocusedQuest
} from '../reducers/quests';

//Components
import Background from '../components/Backgrounds/Background1'
import SliderItem from './HomeScreen/SliderItem';
import QuestGalleryItem from './HomeScreen/QuestGalleryItem';

//Contants
const WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height;

const itemSpacing = 30;
const buttonWidth = (WIDTH - (4 * itemSpacing)) / 3.5;
const initScrollPosition = (WIDTH / 2) - (buttonWidth + itemSpacing) / 2;

const mapStateToProps = state => ({
  selectedQuestIndex: state.quests.selectedQuest,
  currentPosition: state.position.coords,
  focusedQuestIndex: state.quests.focusedQuest,
  userName: state.user.name,
  userAvatar: state.user.avatar,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setQuest,
  setPosition,
  setFocusedQuest
}, dispatch)

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curTime : new Date().getTime(),
      latitude: 59.333184,
      longitude: 18.076914,
      coords: { lat: 59.333184, long: 18.076914 },
      error: null,
      geoLocation: "",
    }
  }

  updateSelectedQuest(i, pos) {
    const { setQuest, navigation, selectedQuestIndex } = this.props;
    const selectedQuest = locations[i];

    if ((selectedQuestIndex === i) && selectedQuest.playable) {
      navigation.navigate("QuestScreen")
    } else {
      this.questScroll.scrollTo({ x: pos, animated: true })
      setQuest(i);
    }
  }

  async componentDidMount() {
    setInterval( () => {
      Geocoder.setApiKey('AIzaSyA0d3gB_dXyNRkhG7HtwzAKSWHidVFexOA');
      const geoLocationResult = Geocoder.getFromLatLng(parseFloat(this.props.currentPosition.lat), parseFloat(this.props.currentPosition.long)).then(
        json => {
          var address_component = json.results[0].address_components[1];
          //alert(address_component.long_name);
          this.setState({
            geoLocation: address_component.long_name,
          })
        },
        error => {
          //alert(error);
        }
      );
    },1000)

    setInterval( () => {
      this.setState({
        curTime : new Date().getTime()
      })
    },1000)

    /*
    console.log("Get permission")
    const { setPosition } = this.props
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Quest Permission',
          'message': 'Quest App needs access to your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permission granted")
        navigator.geolocation.getCurrentPosition(
          (position) => setPosition(position),
          (error) => {
            console.log(error)
            this.setState({ error: error.message })
          },
          { enableHighAccuracy: true, timeout: 230 },
        )
        console.log("Got position")
        this.watchId = navigator.geolocation.watchPosition(
          (position) => setPosition(position),
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 60, maximumAge: 1000, distanceFilter: 10 },
        )
      } else {
        console.log("Permission denied")
      }
    } catch (err) {
      console.warn(err)
    }*/
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.props.setPosition(position)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

    
    const { selectedQuestIndex } = this.props
    this.questScroll.scrollTo({ x: -initScrollPosition + selectedQuestIndex * (buttonWidth + itemSpacing), animated: true })
  }

   updateSelectedQuestOnMomentumEnds(event: Object) {
    const { setFocusedQuest } = this.props

    const index = Math.round((event.nativeEvent.contentOffset.x + initScrollPosition) /(buttonWidth+itemSpacing), 1.0)
    setFocusedQuest(index)
   }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const { focusedQuestIndex } = this.props

    const { selectedQuestIndex, currentPosition } = this.props

    const loctionList = locations.map(function (item, i) {
      let pos = -initScrollPosition + i * (buttonWidth + itemSpacing);
      return (
        <SliderItem key={i} {...item} selected={selectedQuestIndex === i}  focused={focusedQuestIndex === i} itemDimension={buttonWidth} eventLocation={item.coords}
          itemSpacing={itemSpacing} callback={this.updateSelectedQuest.bind(this, i, pos)} phoneLocation={currentPosition} />
      )
    }.bind(this))

    const questGalleryList = locations.map(function (item, i) {
      return (
        <QuestGalleryItem key={i} {...item} played={selectedQuestIndex === i} stars={selectedQuestIndex === i} />
      )
    }.bind(this))

    const geoLocationComponent =  (
      <Text style={styles.topBarText}> {this.state.geoLocation} </Text>
    )

    const selectedQuest = locations[selectedQuestIndex];
    const focusedQuest = locations[focusedQuestIndex];

    const currentSeconds = (selectedQuest.countdown - this.state.curTime)/1000;
    const days = Math.floor(currentSeconds/24/60/60);
    const hoursLeft   = Math.floor((currentSeconds) - (days*86400));
    const hours       = Math.floor(hoursLeft/3600);
    const minutesLeft = Math.floor((hoursLeft) - (hours*3600));
    const minutes     = Math.floor(minutesLeft/60);
    const remainingSeconds = parseInt(currentSeconds % 60, 10);
    const showDays = days < 10? "0"+days : days;
    const showHours = hours < 10? "0"+hours : hours;
    const showMins = minutes < 10? "0"+minutes : minutes;
    const showSecs = remainingSeconds < 10? "0"+remainingSeconds : remainingSeconds;

    return (
      <View style={styles.outerContainer}>
        
        <ScrollView snapToInterval={HEIGHT} decelerationRate={ 'fast' } showsVerticalScrollIndicator={ false }>
          <View style={styles.innerContainer}>
            <View style={styles.background}>
              <Background width={WIDTH + 10} />
            </View>

            <View style={[styles.topBarContainer, styles.topBarContainerColumn]}>
              <Image source={{ uri: this.props.userAvatar }} style={styles.topBarAvatar}/>
              { geoLocationComponent }
            </View>

            <View style={styles.content}>
              <Text style={styles.locationText}>{ (Math.floor(distanceFromPhone(currentPosition, selectedQuest.coords) * 10) / 10) + " km" }</Text>
              <Text style={styles.locationText}>{ selectedQuest.place }</Text>
              <Text style={styles.locationText}>{ showDays } D { showHours } H { showMins } M { showSecs } S</Text>
            </View>

            <View style={styles.sliderItemContainer}>
              <View style={styles.focusedQuestContainer}>
                <Text style={styles.focusedText}> { focusedQuest.provider} </Text>
                <Text style={styles.focusedText}> { focusedQuest.name} </Text>
              </View>

              <ScrollView
                ref={ (list) => this.questScroll = list }

                horizontal={true}
                showsHorizontalScrollIndicator={ false }

                onMomentumScrollEnd={this.updateSelectedQuestOnMomentumEnds.bind(this)}

                decelerationRate={ 'fast' }

                snapToAlignment={ 'center' }
                snapToInterval={ buttonWidth + itemSpacing }
                contentInset={{ top: 0, left: initScrollPosition, bottom: 0, right: initScrollPosition }}
                contentOffset={{ x : -initScrollPosition }}>
                { loctionList }
              </ScrollView>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.topBarContainer}>
              <Text style={styles.topBarText}>{ this.props.userName }</Text>
            </View>

            <View style={styles.questsOverview}>
              { questGalleryList }
            </View>
          </View>
        </ScrollView>
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
    borderBottomColor: '#EAE086',
    borderBottomWidth: 10,
  },

  innerContainer: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT
  },

  topBarContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',

    height: 80,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,

    borderBottomColor: '#EAE086',
    borderBottomWidth: 5,
  },
  topBarContainerColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  topBarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlignVertical: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  locationText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '500',
  },
  
  focusedQuestContainer: {
    marginBottom: 30,
  },
  focusedText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  
  sliderItemContainer: {
    paddingBottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },

  questsOverview: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
