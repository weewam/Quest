import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import {
  updateFinalScore
} from '../../reducers/score'


const mapStateToProps = state => ({
  // todo: save scores and stars to memory
  currentScore: state.score.currentScore,
  currentStar: state.score.currentStar,
  totalScore: state.score.totalScore
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateFinalScore
}, dispatch)

class SuccessScreen extends Component{
  constructor(props) {
      super(props)
   }
   render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Your score of this quest is {this.props.currentScore}
      </Text>
      <Text style={styles.welcome}>
        Your star of this quest is {this.props.currentStar}
      </Text>
      <Text style={styles.welcome}>
        Your total score is {this.props.totalScore}
      </Text>
      <Button title={"Quit"}
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("HomeScreen")}>
              <Text>Quit</Text>
            </Button>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(215, 150, 140)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessScreen)
