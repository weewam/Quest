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

    async componentDidMount() {
        setInterval(() => {
            ReactNativeHeading.start(1)
            .then(didStart => {
                this.setState({
                    headingIsSupported: didStart,
                })
            })

        DeviceEventEmitter.addListener('headingUpdated', data => {
            this.state.heading = data.heading
        });
        }, 10)
        

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
        let res = Math.atan2(latPos, longPos) - headingRadians + 'rad'
        return res
    }
    render() {
        let isTreasureHunt = locations[this.props.selectedQuestIndex].treasureHunt
        let imageUrl = isTreasureHunt ? 'https://i.imgur.com/bXbOvun.png' : 'https://i.imgur.com/lUiIeq4.png'
        let rotation = isTreasureHunt ? '0rad' : this.updateCompass()
        return (
            < View style={styles.container} >
                <Image source={{ uri: imageUrl }} style={{ width: 99 * 0.6, height: 147 * 0.6, transform: [{ rotate: rotation }] }} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(215, 150, 140)',
        marginBottom: 20,
    }
});
export default connect(mapStateToProps)(Compass)
