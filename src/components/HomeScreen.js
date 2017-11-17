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
  Integer
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Imported variables
import { locations } from '../data/locations'

//Actions
import { 
  setQuest,
  setFocusedQuest
} from '../reducers/quests';

//Components
import Background from '../components/Backgrounds/Background1'
import SliderItem from './HomeScreen/SliderItem';


//Contants
const WIDTH = Dimensions.get('window').width,
      HEIGHT = Dimensions.get('window').height;

const itemSpacing = 30;
const buttonWidth = (WIDTH - (4 * itemSpacing)) / 3.5;
const initScrollPosition = (WIDTH/2) - (buttonWidth + itemSpacing)/2;

const mapStateToProps = state => ({
  selectedQuestIndex: state.quests.selectedQuest,
  focusedQuestIndex: state.quests.focusedQuest,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setQuest,
  setFocusedQuest,
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

   updateSelectedQuestOnMomentumEnds(event: Object) {
    const { setFocusedQuest } = this.props

    const index = Math.round((event.nativeEvent.contentOffset.x + initScrollPosition) /(buttonWidth+itemSpacing), 1.0)
    setFocusedQuest(index)
   }

   

  render() {
    const { selectedQuestIndex } = this.props
    const { focusedQuestIndex } = this.props

    const loctionList = locations.map(function(item, i){
      let pos = -initScrollPosition + i*(buttonWidth + itemSpacing);

      return (
        <SliderItem key={i} {...item} selected={ selectedQuestIndex === i } focused={focusedQuestIndex === i} itemDimension={ buttonWidth } itemSpacing={ itemSpacing } callback={ this.updateSelectedQuest.bind(this, i, pos) }/>
      )
    }.bind(this))

    const selectedQuest = locations[selectedQuestIndex];
    const focusedQuest = locations[focusedQuestIndex]



    return (
      <View style={styles.outerContainer}>
        <View style={ styles.background }>
          <Background width={ WIDTH + 10 }/>
        </View>

        <View style={styles.innerContainer}>

          <View style={styles.content}> 
            <Text style={styles.locationText}>{ selectedQuest.adress }</Text>
            
            <Text style={styles.locationText}>{ selectedQuest.name }</Text>
            <Text style={styles.locationText}>{ selectedQuest.company }</Text>
          </View>

          <View>
            <View  ref={ () => this.focusedQuestView } style={styles.content}>
              <Text style={styles.focusedText}> { focusedQuest.name} </Text>
              <Text style={styles.focusedText}> { focusedQuest.company} </Text>
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
                contentOffset={{ x : -initScrollPosition }}
              >
                { loctionList }
              </ScrollView>
            </View>
            <Button style={styles.button} title={"QuestScreen"}
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("QuestScreen")}>
              <Text>Goto QuestScreen</Text>
            </Button>
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
  focusedText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  scrollView: {
    paddingBottom: 80,
    paddingTop:0,
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)