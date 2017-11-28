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
import Swiper from '../reducers/swiper';

//Components
import Background from '../components/Backgrounds/Background1'
import SliderItem from './HomeScreen/SliderItem';
import FunctionList from './HomeScreen/FunctionList';

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

    const selectedQuest = locations[selectedQuestIndex];
    const focusedQuest = locations[focusedQuestIndex]
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
    //Image source={{ uri: reward[0]}} style={styles.iconImage}/>

    const rewardList = focusedQuest.rewards.map((reward, i) => (
      <View style={styles.iconView} key={i}>
        <Image source={{ uri: "https://png.icons8.com/paper-money/win8/1600"}} style={styles.iconImage}/>
        <Text style={styles.rewardText}> { reward[1] } </Text>
      </View>
    ));

    return (
      <View style={styles.outerContainer}>
        <View style={styles.background}>
          <Background width={WIDTH + 10} />
        </View>
        <ScrollView >
        <View style={styles.innerContainer}>
            <Swiper>
              <View style={styles.content}>
                <Text style={styles.locationText}>{ (Math.floor(distanceFromPhone(currentPosition, selectedQuest.coords) * 10) / 10) + " km" }</Text>
                <Text style={styles.locationText}>{ selectedQuest.place }</Text>
                <Text style={styles.locationText}>{ showDays } D { showHours } H { showMins } M { showSecs } S</Text>
              </View>
              <View style={styles.rewardView}>
                {rewardList}
              </View>
            </Swiper>
            <View>
                <View  ref={ () => this.focusedQuestView } style={styles.content}>
                  <Text style={styles.focusedText}> { focusedQuest.provider} </Text>
                  <Text style={styles.focusedText}> { focusedQuest.name} </Text>
                </View>
              <View style={styles.scrollView}>
                <ScrollView
                  ref={ (list) => this.questScroll = list }

                  horizontal={true}
                  showsHorizontalScrollIndicator={ false }

                  onMomentumScrollEnd={this.updateSelectedQuestOnMomentumEnds.bind(this)}

                  decelerationRate={ 'fast' }

                  snapToAlignment={ 'center' }
                  snapToInterval={ buttonWidth + itemSpacing }

                  contentInset={{ top: 0, left: initScrollPosition, bottom: 0, right: initScrollPosition }}
                  contentOffset={{ x : -initScrollPosition + selectedQuestIndex * (buttonWidth + itemSpacing) }}
                >
                  { loctionList }
                </ScrollView>
              </View>
            </View>
        </View>
        <View style={styles.innerContainer}>
            <View style={styles.content}>
              <Text>User Name</Text>
            </View>
            <ScrollView style={styles.scrollView} horizontal={true}>
              <View>
                <Text>Maybe we postpone the avatar room</Text>
              </View>
              <View>
                <Text>Not implement this function on this stage</Text>
              </View>
            </ScrollView>

              <View>
                <FunctionList navigator={this.props.navigation}/>
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
    left : -10
  },

  innerContainer: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT
  },

  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  locationText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  button:  {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  focusedText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  scrollView: {
    paddingBottom: 80,
    paddingTop:0,
  },
  rewardView: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 80,
    marginBottom: 30,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'white',
  },
  iconImage: {
    width: 30,
    height: 15,
    marginRight: 20
  },
  iconView: {
    flexDirection: 'row',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
