import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from "react-native";
import { MapView } from 'expo';

class MapScreen extends Component {
    // component level state
    state = {
        mapLoaded: false,
        region: {
            longitude: -79.6010328,
            latitude: 43.6565353,
            longitudeDelta: 0.04,
            latitudeDelta: 1
        }
    }

    // set the state once the map has loaded
    componentDidMount(){
        this.setState({ mapLoaded: true });
    }
    
    render(){
        if(!this.state.mapLoaded){
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
                />
            </View>
        );
    }
}

export default MapScreen;