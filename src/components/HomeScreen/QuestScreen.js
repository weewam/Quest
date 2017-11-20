import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { locations } from '../../data/locations'

import {
  setQuest,
  setFocusedQuest
} from '../../reducers/quests';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Contants
const WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height,
  IMAGE_SIZE = WIDTH*0.7;


const mapStateToProps = state => ({
  selectedQuestIndex: state.quests.selectedQuest,
  currentPosition: state.position.coords,
  focusedQuestIndex: state.quests.focusedQuest,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setQuest,
  setFocusedQuest
}, dispatch)

class QuestScreen extends Component{
    constructor(props) {
        super(props)
        this.state.showInfo = locations[this.props.selectedQuestIndex].about != null
        this.state.showQuestions = locations[this.props.selectedQuestIndex].questions != null
     }
    state = {
      modalVisible: false,
      showInfo: false,
      showQuestions: false,
      questScreenModal: null,
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
    renderInfo() {
      return (
        <Text>INFO</Text>
        )
    }
    renderQuestions() {
      return (
        <Text>QUIZ</Text>
        )
    }
   
    renderQuestScreenModal () {
      if(this.state.questScreenModal === "info") {
        return(
          <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}> About {locations[this.props.selectedQuestIndex].name} </Text>
          <Text style={styles.aboutText}>
            {locations[this.props.selectedQuestIndex].about}
          </Text>
        </View>)
      } else if(this.state.questScreenModal === "quiz"){
        const questionsList = locations[this.props.selectedQuestIndex].questions[1].map(
          function (item, i) {
            return (
              <Text key={i}>{(i+1) + ". " +  locations[this.props.selectedQuestIndex].questions[1][i] + "\n"}</Text>
            )
    }.bind(this))
        return(
        <View>
          <Text>
            {locations[this.props.selectedQuestIndex].questions[0][0] + "\n"}
          </Text>
          <Text>
            {questionsList}
          </Text>
        </View>
        )
      }
    }


   render() {
    const { selectedQuestIndex, currentPosition } = this.props
    const selectedQuest = locations[selectedQuestIndex];

    return (
      <View style={styles.outerView}>
        <View style={styles.backButtonView}>
          <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => this.props.navigation.goBack(null)}>
            <View>
              <Text style={styles.backButton}>{'<'} Back</Text>
            </View>
          </TouchableHighlight>
          

        </View>
        <View style={styles.container}>
          <Image source={{ uri: selectedQuest.image }} style={[styles.itemImage, { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 }]} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{ selectedQuest.name }</Text>
            <Text style={styles.text}>{ selectedQuest.provider }</Text>
            <Text style={styles.text}>{ selectedQuest.place }</Text>
          </View>
          <View >
            
            {this.state.showInfo === true && <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => {
              this.state.questScreenModal = "info"
              this.setModalVisible(true)
              
            }}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}> 
                {this.renderInfo()}
              </Text>
            </View>
            </TouchableHighlight>
            }


            {this.state.showQuestions === true && <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => {
              this.state.questScreenModal = "quiz"
              this.setModalVisible(true)
              
            }}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}> 
                {this.renderQuestions()}
              </Text>
            </View>
            </TouchableHighlight>
            }
            
            
          </View>
          <View style={styles.modalView}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                onShow={this.renderText}
                style={{backgroundColor: 'rgb(215, 150, 140)'}, {width: 200}}

                >
               <View style={styles.modal}>
                <View>
                  <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                    <View>
                      <Text style={styles.closeButton}>X</Text>
                    </View>
                  </TouchableHighlight>
                </View>
                {this.renderQuestScreenModal()}
               </View>
              </Modal>
            </View>
        </View>
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    //paddingTop: WIDTH*0.05,
    backgroundColor: 'rgb(215, 150, 140)',
  },
  outerView: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //flexDirection: 'column',
    paddingTop: WIDTH*0.05,
    backgroundColor: 'rgb(215, 150, 140)',
  },
  modalView: {
    backgroundColor: 'rgb(215, 150, 140)',
    width: WIDTH,
    height: HEIGHT,
  },
  modal: {
    backgroundColor: 'rgb(215, 150, 140)',
    width: WIDTH,
    height: HEIGHT,
    paddingTop: 20,

  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    width: WIDTH*0.5,
    paddingTop: 7.5,
    paddingBottom: 7.5,
    marginTop: 10,

  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  aboutContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  },
  aboutText: {
    color: 'white',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
  },
  aboutTitle: {
    color: 'white',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,

  },
  closeButton: {
    fontSize: 30,
    color: 'white',
    marginLeft: 15,
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  itemImage: {
    marginTop: HEIGHT*0.05,
  },
  backButtonView: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  buttonStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  backButton: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginLeft: 10,
    marginTop: 10,

  }
});


export default connect(mapStateToProps, mapDispatchToProps)(QuestScreen)
