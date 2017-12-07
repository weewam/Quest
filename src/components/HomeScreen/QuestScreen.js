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
import ClueModal from './ClueModal';

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
        this.state.index = this.props.selectedQuestIndex
        this.state.showInfo = locations[this.props.selectedQuestIndex].about != null
        // according to the types of question to show different buttons and access data
        this.state.showType = locations[this.props.selectedQuestIndex].type
        this.state.finish = false
        switch(this.state.showType){
          case "QUIZ":
            this.state.showQuestions = locations[this.props.selectedQuestIndex].questions != null
            break
          case "CLUE":
            this.state.showQuestions = locations[this.props.selectedQuestIndex].clues != null
            break
          default:
            this.state.showQuestions = false
        }

     }
    state = {
      modalVisible: false,
      showInfo: false,
      showQuestions: false,
      questScreenModal: null,
      currentScore: 0,
      maxScore: 0
    }

    componentWillReceiveProps(nextProps){
      if(this.state.finish){
        this.setState(
          {
            index: nextProps.selectedQuestIndex,
            showInfo: locations[nextProps.selectedQuestIndex].about,
            showType: locations[nextProps.selectedQuestIndex].type,
            showQuestions: false,
            finish: false
          }
          // , function(){
          //   console.log("Props:",this.state)
          // }
        )
      }
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    renderTemplate(modalName, textName, modal){
      return (
        <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => { this.state.questScreenModal = {modalName}, this.setModalVisible(true) }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              <Text>{textName}</Text>
            </Text>
          </View>
        </TouchableHighlight>
      )
    }

    renderInfo() {
      if(this.state.showInfo!=null){
        return (<TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => { this.state.questScreenModal = "info", this.setModalVisible(true) }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              <Text>INFO</Text>
            </Text>
          </View>
        </TouchableHighlight>)
      }
    }

    renderQuestions(modal) {
      switch(this.state.showType){
      case "QUIZ":
        return (
          <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => { this.state.questScreenModal = "quiz", this.setModalVisible(true) }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                <Text>QUIZ</Text>
              </Text>
            </View>
          </TouchableHighlight>
        )
      case "CLUE":
        return (
          <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => { this.state.questScreenModal = "clue", this.setModalVisible(true) }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                <Text>SOLVE THE CLUES</Text>
              </Text>
            </View>
          </TouchableHighlight>
        )
      default:
      return;
      }
    }

    updateQuestion(correctAnswer){
      if(correctAnswer) {
        this.props.nextQuestion()
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
        if(this.state.currentScore/this.state.maxScore >= 0.66){
          this.props.updateFinalScore(this.state.currentScore, 3, this.props.selectedQuestIndex)
        } else if(this.state.currentScore/this.state.maxScore < 0.33){
          this.props.updateFinalScore(this.state.currentScore, 1, this.props.selectedQuestIndex)
        } else {
          this.props.updateFinalScore(this.state.currentScore, 2, this.props.selectedQuestIndex)
        }
        this.props.navigation.navigate("SuccessScreen")
      } else {
        this.props.navigation.navigate("FailedScreen")
      }
      this.setState({
        finish: true
      }, function(){
        this.props.setNextQuestion(0)
      })
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
    // alert(this.state.questScreenModal, JSON.stringify(selectedQuest))
    let modal = null;
    if (this.state.questScreenModal === "info") {
      modal = <InfoModal selectedQuest={locations[this.state.index]}/>
    }

    if (this.state.questScreenModal === "quiz") {
      modal =
      <QuizModal
      lastQuestion={selectedQuestion[this.state.index] === (locations[this.state.index].questions.length-1)}
      selectedQuestion={locations[this.state.index].questions[this.props.selectedQuestion[this.state.index]]}
      callback={this.updateQuestion.bind(this)}
      finishQuest={this.finishQuest.bind(this)}
      currentScore={this.state.currentScore}
      updateCurrentScore={this.updateCurrentScore.bind(this)}
      updateMaxScore={this.updateMaxScore.bind(this)}
      />
    }

    if (this.state.questScreenModal === "clue") {
      modal =
      <ClueModal
      lastQuestion={selectedQuestion[this.state.index] === (locations[this.state.index].clues.length-1)}
      selectedQuestion={locations[this.state.index].clues[this.props.selectedQuestion[this.state.index]]}
      callback={this.updateQuestion.bind(this)}
      finishQuest={this.finishQuest.bind(this)}
      currentScore={this.state.currentScore}
      updateCurrentScore={this.updateCurrentScore.bind(this)}
      updateMaxScore={this.updateMaxScore.bind(this)}
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
              {this.renderInfo()}
              {this.renderQuestions(modal)}
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
