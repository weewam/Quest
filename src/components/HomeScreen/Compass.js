import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { locations } from '../../data/locations';
import { ReactNativeHeading } from 'NativeModules';

const mapStateToProps = state => ({
    selectedQuestIndex: state.quests.selectedQuest,
    currentPosition: state.position.coords
})

class Compass extends Component {
    constructor(props) {
        super(props)
        this.updateCompass = this.updateCompass.bind(this)
        this.state = {
            heading: 0
        }

    }

    componentDidMount() {
        ReactNativeHeading.start(1)
            .then(didStart => {
                this.setState({
                    headingIsSupported: didStart,
                })
            })

        DeviceEventEmitter.addListener('headingUpdated', data => {
            this.state.heading = data.heading
        });

    }

    componentWillUnmount() {
        ReactNativeHeading.stop();
        DeviceEventEmitter.removeAllListeners('headingUpdated');
    }

    updateCompass() {
        let selectedQuestCoords = locations[this.props.selectedQuestIndex].coords
        let currentPosition = this.props.currentPosition
        let latPos = currentPosition.lat - selectedQuestCoords.lat
        let longPos = currentPosition.long - selectedQuestCoords.long
        let headingRadians = this.state.heading * Math.PI / 180


        return Math.atan2(latPos, longPos) - headingRadians + 'rad'
    }
    render() {
        return (
            < View style={styles.container} >
                <Image source={{ uri: 'https://i.imgur.com/lUiIeq4.png' }} style={{ width: 97.98, height: 142.33, transform: [{ rotate: this.updateCompass() }] }} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(215, 150, 140)',
    }
});
export default connect(mapStateToProps)(Compass)
