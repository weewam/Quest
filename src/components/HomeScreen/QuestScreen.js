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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { locations } from '../../data/locations';

import InfoModal from './InfoModal';
import QuizModal from './QuizModal';

import {
  setQuest,
  setFocusedQuest,
  nextQuestion,
  setNextQuestion,
} from '../../reducers/quests';
import {
  updateFinalScore
} from '../../reducers/score'


//Contants
const WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height;


const mapStateToProps = state => ({
  selectedQuestIndex: state.quests.selectedQuest,
  currentPosition: state.position.coords,
  selectedQuestion: state.quests.selectedQuestion,
  // todo: save scores and stars to memory
  currentScore: state.score.currentScore,
  currentStar: state.score.currentStar,
  totalScore: state.score.totalScore
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setQuest,
  setFocusedQuest,
  nextQuestion,
  setNextQuestion,
  updateFinalScore
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
      currentScore: 0,
      maxScore: 0
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    updateQuestion(correctAnswer){
      if(correctAnswer) {
        this.props.nextQuestion()
        this.quizModal.resetState(locations[this.props.selectedQuestIndex].questions[this.props.selectedQuestion[this.props.selectedQuestIndex]+1][1].length)
      } else{
        this.setModalVisible(!this.state.modalVisible)
        this.props.navigation.navigate("FailedScreen")
        this.props.setNextQuestion(0)
      }
    }


    finishQuest(success, score) {
      this.setModalVisible(!this.state.modalVisible)
      this.updateCurrentScore(score)
      if(success) {
        // console.log("updateFinalScore:", this.state.currentScore, this.state.maxScore)
        if(this.state.currentScore/this.state.maxScore >= 0.66){
          this.props.updateFinalScore(this.state.currentScore, 3)
        } else if(this.state.currentScore/this.state.maxScore < 0.33){
          this.props.updateFinalScore(this.state.currentScore, 1)
        } else {
          this.props.updateFinalScore(this.state.currentScore, 2)
        }
        this.props.navigation.navigate("SuccessScreen")
      } else {
        this.props.navigation.navigate("FailedScreen")
      }
      this.props.setNextQuestion(0)

    }

    updateCurrentScore(currentScore){
      this.state.currentScore += currentScore
    }

    updateMaxScore(maxScore){
      this.state.maxScore += maxScore
    }

   render() {
    const { selectedQuestIndex, currentPosition, selectedQuestion } = this.props
    const selectedQuest = locations[selectedQuestIndex];

    let modal = null;

    if (this.state.questScreenModal === "info") {
      modal = <InfoModal selectedQuest={locations[this.props.selectedQuestIndex]}/>
    }

    if (this.state.questScreenModal === "quiz") {
      modal =
      <QuizModal
      lastQuestion={selectedQuestion[this.props.selectedQuestIndex] === (locations[this.props.selectedQuestIndex].questions.length-1)}
      selectedQuestion={locations[this.props.selectedQuestIndex].questions[this.props.selectedQuestion[this.props.selectedQuestIndex]]}
      callback={this.updateQuestion.bind(this)}
      finishQuest={this.finishQuest.bind(this)}
      currentScore={this.state.currentScore}
      updateCurrentScore={this.updateCurrentScore.bind(this)}
      updateMaxScore={this.updateMaxScore.bind(this)}
      ref={instance => { this.quizModal = instance; }}
      />
    }

    return (
      <View style={styles.container}>        
        <View style={styles.backButtonContainer}>
          <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => this.props.navigation.goBack(null)}>
            <Image style={styles.backButton} source={require('../../icons/arrow-left.png')} />
          </TouchableHighlight>
        </View>

        <View style={styles.questImageContainer}>
          <Image style={ styles.questImage } source={{ uri: selectedQuest.image }} />
        </View>

        <View style={styles.content}>
          <View style={styles.centerContent}>
            <Text style={styles.questName}>{ selectedQuest.name }</Text>
            <Text style={styles.questProvider}>{ selectedQuest.provider }</Text>

            <View style={styles.buttonContainer}>
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => { this.state.questScreenModal = "info", this.setModalVisible(true) }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>INFO</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => { this.state.questScreenModal = "quiz", this.setModalVisible(true) }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>QUIZ</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.questLocationContainer}>
            <Text style={styles.questLocationText}>{ selectedQuest.place }</Text>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          onShow={this.renderText}
          style={{backgroundColor: 'rgb(215, 150, 140)'}, {width: 200}}>

          <View style={styles.modal}>
            <View>
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={ () => { this.setModalVisible(!this.state.modalVisible) } }>
                <Image style={styles.closeButton} source={require('../../icons/cross.png')} />
              </TouchableHighlight>
            </View>

            { modal }
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: 'rgb(215, 150, 140)',
  },
  modal: {
    backgroundColor: 'rgb(215, 150, 140)',
    width: WIDTH,
    height: HEIGHT,
    paddingTop: 20,
  },
  closeButton: {
    width: 20,
    height: 20,
    margin: 10,
  },


  backButtonContainer: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
  },
  backButton: {
    width: 20,
    height: 20,
    margin: 10,
  },

  questImageContainer: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'rgba(38, 40, 50, 1)',
  },
  questImage: {
    position: 'absolute',
    top: 0,
    left: -(HEIGHT - WIDTH)/2,

    width: HEIGHT,
    height: HEIGHT,
    opacity: 0.5,
  },

  content: {
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  centerContent: {
    alignItems: 'center',
  },
  questName: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: "Montserrat-Bold",
    letterSpacing: 0.25,
  },
  questProvider: {
    marginTop: 10,

    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: "Montserrat-SemiBold",
    letterSpacing: 0.25,
  },
  
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',

    width: WIDTH*0.5,
    height: 46,
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: 'rgb(215, 150, 140)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 16,
    color: 'white',
    fontFamily: "Montserrat-SemiBold",
  },

  questLocationContainer: {
    position: 'absolute',
    bottom: 25,
  },
  questLocationText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: "Montserrat-SemiBold",
    letterSpacing: 0.25,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(QuestScreen)
