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
  Integer,
  PermissionsAndroid
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Imported variables
import { locations } from '../data/locations'

//Actions
import { setQuest } from '../reducers/quests';
import { setPosition } from '../reducers/position';

//Components
import Background from '../components/Backgrounds/Background1'
import SliderItem from './HomeScreen/SliderItem';


//Contants
const WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height;

const itemSpacing = 30;
const buttonWidth = (WIDTH - (4 * itemSpacing)) / 3.5;
const initScrollPosition = (WIDTH / 2) - (buttonWidth + itemSpacing) / 2;



const mapStateToProps = state => ({
  selectedQuestIndex: state.quests.selectedQuest,
  currentPosition: state.position.coords
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setQuest,
  setPosition
}, dispatch)

class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }

  updateSelectedQuest(i, pos) {
    const { setQuest } = this.props;

    this.questScroll.scrollTo({ x: pos, animated: true })
    setQuest(i);
  }

  async componentDidMount() {
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
    }


  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const { selectedQuestIndex, currentPosition } = this.props

    const loctionList = locations.map(function (item, i) {
      let pos = -initScrollPosition + i * (buttonWidth + itemSpacing);
      return (
        <SliderItem key={i} {...item} selected={selectedQuestIndex === i} itemDimension={buttonWidth} eventLocation={item.coords}
          itemSpacing={itemSpacing} callback={this.updateSelectedQuest.bind(this, i, pos)} phoneLocation={currentPosition} />
      )
    }.bind(this))

    const selectedQuest = locations[selectedQuestIndex];

    return (
      <View style={styles.outerContainer}>
        <View style={styles.background}>
          <Background width={WIDTH + 10} />
        </View>

        <View style={styles.innerContainer}>

          <View style={styles.content}>
            <Text style={styles.locationText}>{selectedQuest.adress}</Text>

            <Text style={styles.locationText}>{selectedQuest.name}</Text>
            <Text style={styles.locationText}>{selectedQuest.company}</Text>
          </View>

          <View style={styles.scrollView}>
            <ScrollView
              ref={(list) => this.questScroll = list}

              horizontal={true}
              showsHorizontalScrollIndicator={false}

              decelerationRate={'fast'}

              snapToAlignment={'center'}
              snapToInterval={buttonWidth + itemSpacing}

              contentInset={{ top: 0, left: initScrollPosition, bottom: 0, right: initScrollPosition }}
              contentOffset={{ x: -initScrollPosition }}
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
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgb(215, 150, 140)',
  },

  background: {
    position: 'absolute',
    bottom: 0,
    left: -10,
  },

  innerContainer: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },

  scrollView: {
    paddingBottom: 80,
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)