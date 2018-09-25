import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from "react-native";
import { MapView } from 'expo';
import { connect } from "react-redux";

import * as actions from '../actions';
import { Button } from 'react-native-elements';

class MapScreen extends Component {
    // component level state
    state = {
        mapLoaded: false,
        region: {
            longitude: -122,//-79.6010328,
            latitude: 37,//43.6565353,
            longitudeDelta: 0.04,
            latitudeDelta: 1
        }
    }

    // set the state once the map has loaded
    // fixes map location and loading, sometimes the map doesnt load and the region is set and causes an issue
    // this will wait until the component is loaded before setting the map and value
    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    // track where the user goes with the map
    onRegionChangeComplete = (region) => {
        //console.log(region); // to see if the dragging returns a location and stuff
        // take the region object and update state
        this.setState({ region });
    }    

    // button press
    onButtonPress = () => {
        // fire off the query from job_actions
        // we are going to get the reducer to navigate them to next since it will determine if state is good
        // second arg arrow function as a callback
        // this function will still have access to the props that are in the mapsScreen component
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return (
            // expand and fill all the area on the screen with flex 1
            <View style={{ flex: 1 }}>
                <MapView
                    
                    region={this.state.region}
                    style={{ flex: 1 }}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContainer}>
                    <Button 
                        large
                        title="Find Jobs"
                        backgroundColor="#009688"
                        icon={{ name: 'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
}

export default connect(null, actions)(MapScreen);