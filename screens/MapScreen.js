import React, { Component } from 'react';
import { View, Text } from "react-native";
import { MapView } from 'expo';

class MapScreen extends Component {
    // component level state
    state = {
        region: {
            longitude: -79.6010328,
            latitude: 43.6565353,
            longitudeDelta: 0.04,
            latitudeDelta: 1
        }
    }
    
    render(){
        return (
            // expand and fill all the area on the screen with flex 1
            <View style={{ flex: 1 }}>
                <MapView 
                region={this.state.region}
                style={{ flex: 1 }} 
                />
            </View>
        )
    }
}

export default MapScreen;