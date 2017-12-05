import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import { StackNavigator } from 'react-navigation';



class ClueModal extends Component{
  constructor(props) {
      super(props)
      this.state = {
        selectedAnswer: [],
        selectedIndex: [],
        characterSet: [],
        score: this.props.selectedQuestion[2].length,
        showAnswer: false,
        characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
      'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      };
      this.props.updateMaxScore(this.props.selectedQuestion[2].length)
      this.getCharacterSet()
  }

  resetState(potentialScore){
    this.setState({
      selectedAnswer: [],
      selectedIndex: [],
      characterSet: [],
      score: potentialScore,
      showAnswer: false
    })
    this.props.updateMaxScore(potentialScore)
    this.getCharacterSet()
  }

  checkAnswer(){
    for(i = 0; i < this.props.selectedQuestion[2].length; i++){
      if(this.state.selectedAnswer[i] !== this.props.selectedQuestion[2][i]){
        return false
      }
    }
    return true
  }

  calScore(){
    if(this.checkAnswer()){
      this.props.updateCurrentScore(this.state.score)
      this.props.callback((true));
    } else{
      this.state.selectedAnswer.length = 0
      this.state.selectedIndex.length = 0
      if(this.state.score === 0){
        // show the answer and let the player pass
        this.state.showAnswer = true
        this.state.selectedAnswer.length = 0
        for(i = 0; i < this.props.selectedQuestion[2].length; i++){
          this.state.selectedAnswer[i] = this.props.selectedQuestion[2][i]
        }
      } else {
        this.state.score -= 1
      }
    }
  }

  getCharacterSet(){
    // generate character set
    // random generate 15 characters\
    for(i = 0; i < 5; i++){
      this.state.characterSet.push(this.state.characters[Math.floor((Math.random()*10)%this.state.characters.length)])
    }
    // append the answer characters
    for(i = 0; i < this.props.selectedQuestion[2].length; i++){
      this.state.characterSet.push(this.props.selectedQuestion[2][i])
    }
    // shuffle
    for (let i = this.state.characterSet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.state.characterSet[i], this.state.characterSet[j]] =
        [this.state.characterSet[j], this.state.characterSet[i]]
    }
  }
  onPress() {
    //alert("selectedAnswer: " + this.state.selectedAnswer + "\n" +
    //      "CorrectAnswer: " + this.props.selectedQuestion[2] + "\n" +
    //      "Correct answer: " + (this.state.selectedAnswer === this.props.selectedQuestion[2]))
    if(this.state.selectedAnswer.length === this.props.selectedQuestion[2].length) {
      this.calScore()
    } else {
      alert("Select an answer")
    }

  }

  selectAnswer(guessIndex) {
    // if(this.state.selectedIndex.indexOf(guessIndex) === -1 &&
    if(this.state.selectedAnswer.length < this.props.selectedQuestion[2].length){
      this.setState({
        selectedAnswer: [...this.state.selectedAnswer, this.state.characterSet[guessIndex]],
        selectedIndex: [...this.state.selectedIndex, guessIndex]
      }, () => {
        this.render()
      });
    }
  }

  deleteAnswer(deleteIndex) {
    this.state.selectedAnswer.splice(deleteIndex, 1)
    this.state.selectedIndex.splice(deleteIndex, 1)
    this.setState({
      selectedAnswer: [...this.state.selectedAnswer],
      selectedIndex: [...this.state.selectedIndex]
    }, function() {
      this.render()
    });
  }

  finishQuest() {
    if(this.checkAnswer()) {
      this.props.finishQuest(true, this.state.score)
    } else if(this.state.selectedAnswer.length === this.props.selectedQuestion[2].length) {
      this.calScore()
    }
    else {
      alert("Select an answer")
    }
  }


  render() {
    const {selectedQuestion, lastQuestion} = this.props;
    const answers = this.state.selectedAnswer.map(
      function(item, i) {
        // return (
        //   <TouchableHighlight key={"answer"+i} underlayColor='rgba(0, 0, 0, 0)'
        //   disabled={!this.state.showAnswer}
        //   onPress={ this.deleteAnswer.bind(this, i)} >
        //     <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
        //       <Text style={styles.answerItemTextSelected}>{ `${item}`}</Text>
        //     </View>
        //   </TouchableHighlight>
        // )
        return (
          <TouchableHighlight key={"answer"+i} underlayColor='rgba(0, 0, 0, 0)'
          onPress={ this.deleteAnswer.bind(this, i)}
          disabled={!this.state.showAnswer} >
            <View style={{backgroundColor: 'rgba(0,0,0,1)'}}>
              <Text style={styles.answerItemTextSelected}>{ `${item}`}</Text>
            </View>
          </TouchableHighlight>
        )
    }.bind(this))
    const answerList = this.state.characterSet.map(
          function (item, i) {
            disabled = this.state.selectedIndex.indexOf(i) !== -1? true : false
            return (
              <TouchableHighlight key={"list"+i} underlayColor='rgba(0, 0, 0, 0)'
              onPress={this.selectAnswer.bind(this, i)}
              disabled={disabled}>
                <View style={{backgroundColor: disabled ? 'rgba(0,0,0,0.5)':'rgba(0,0,0,0)'}}>
                  <Text style={disabled ? styles.answerItemTextSelected : styles.answerItemText}>{`${item}`}</Text>
                </View>
              </TouchableHighlight>
            )
    }.bind(this))
    const nextButton = (
      <View>
          <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={ this.onPress.bind(this) }>
          <View>
            <Text style={styles.buttonStyle}>Next Question</Text>
          </View>
        </TouchableHighlight>
      </View>
      )

    const finishButton = (
      <View>
          <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={ this.finishQuest.bind(this) }>
          <View>
            <Text style={styles.buttonStyle}>Finish</Text>
          </View>
        </TouchableHighlight>
        </View>
        )

    const scoreView = (
      <View>
        <Text style={styles.aboutText}>Potential Score: {this.state.score}</Text>
        <Text style={styles.aboutText}>Current Score: {this.props.currentScore}</Text>
      </View>
    )
    return(
      <View style={styles.quizContainer}>
        <View style={styles.quiz}>
          <Text style={styles.questionText}>
            {selectedQuestion[1] + "\n"}
          </Text>
            {answers}
            {answerList}

        </View>
        {(lastQuestion) ? finishButton : nextButton}
        {scoreView}
      </View>

    )

  }
}


const styles = StyleSheet.create({
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
  quizContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionText: {
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  answerItemText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'transparent',
    paddingTop: 10,
    paddingLeft: 10,
  },
  answerItemTextSelected: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    paddingTop: 10,
    paddingLeft: 10,
  },
  buttonStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginTop: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ClueModal
