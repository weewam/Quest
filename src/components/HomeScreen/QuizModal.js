import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import { StackNavigator } from 'react-navigation';



class QuizModal extends Component{
  constructor(props) {
      super(props)
      this.state = {
        selectedAnswer: false,
        selectedOptions: [],
        score: this.props.selectedQuestion[1].length
      };
      this.props.updateMaxScore(this.props.selectedQuestion[1].length)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedAnswer: false,
      selectedOptions: [],
      score: nextProps.selectedQuestion[1].length
    })
    this.props.updateMaxScore(nextProps.selectedQuestion[1].length)
  }

  calScore(){
    if(this.state.selectedAnswer === this.props.selectedQuestion[2]){
      this.props.updateCurrentScore(this.state.score)
      this.props.callback((this.state.selectedAnswer === this.props.selectedQuestion[2]));
    } else{
      this.setState({selectedOptions:[...this.state.selectedOptions, this.state.selectedAnswer]});
      this.state.score -= 1
    }
    this.setState({selectedAnswer: false});
  }

  onPress() {
    //alert("selectedAnswer: " + this.state.selectedAnswer + "\n" +
    //      "CorrectAnswer: " + this.props.selectedQuestion[2] + "\n" +
    //      "Correct answer: " + (this.state.selectedAnswer === this.props.selectedQuestion[2]))
    if(this.state.selectedAnswer !== false) {
      this.calScore()
    } else {
      alert("Select an answer")
    }

  }
  selectAnswer(guess) {
    this.setState({ selectedAnswer: guess });
  }
  finishQuest() {
    if(this.state.selectedAnswer !== false && (this.state.selectedAnswer === this.props.selectedQuestion[2])) {
      this.props.finishQuest(true, this.state.score)
    } else if(this.state.selectedAnswer !== false) {
      this.calScore()
    }
    else {
      alert("Select an answer")
    }
  }


  render() {
    const {selectedQuestion, lastQuestion} = this.props;
    const answerList = selectedQuestion[1].map(
          function (item, i) {
            return (
              <TouchableHighlight key={i} underlayColor='rgba(0, 0, 0, 0)'
              onPress={ this.selectAnswer.bind(this, i)}
              disabled={this.state.selectedOptions.indexOf(i) !== -1} >
                <View style={{backgroundColor: this.state.selectedOptions.indexOf(i) !== -1 ? 'rgba(0,0,0,0.5)':'rgba(0,0,0,0)'}}>
                  <Text style={(this.state.selectedAnswer === i) ? styles.answerItemTextSelected : styles.answerItemText}>{ `${i+1}. ${item} \n`}</Text>
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
            {selectedQuestion[0] + "\n"}
          </Text>

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

export default QuizModal
