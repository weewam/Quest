import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { locations } from '../../data/locations';
import { ReactNativeHeading } from 'NativeModules';

import { distanceFromPhone } from '../../MapUtils'
const mapStateToProps = state => ({
    selectedQuestIndex: state.quests.selectedQuest,
    currentPosition: state.position.coords
})

const WIDTH = Dimensions.get('window').width,
    HEIGHT = Dimensions.get('window').height;
class HuntModal extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { selectedQuest } = this.props;
        const distance = (Math.floor(distanceFromPhone(this.props.currentPosition, selectedQuest.coords) * 10) / 10)
        const color = distance < 1 ? 'green' : 'red'
        const textColor = {
            color: color
        }
        return (
            <View>
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutTitle}> {selectedQuest.name} </Text>
                    <Text style={styles.aboutText}>
                        {selectedQuest.about}
                    </Text>
                </View>
                <View>
                    <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={() => this.props.finishQuest(true, 1)}>
                        <View style={styles.finishContainer} >
                            <Text style={[styles.textStyle, textColor]}>{distance + " km"}</Text>
                            <Text style={[styles.textStyle, styles.buttonStyle]}>Finish</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View >
        );
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
    finishContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonStyle: {
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    textStyle: {
        marginTop: 50,
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        textAlignVertical: "center",
        textAlign: "center",
        width: WIDTH * 0.5
    }
});

export default connect(mapStateToProps)(HuntModal)
