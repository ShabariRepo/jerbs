import React, { Component } from 'react';
import { View, Text } from "react-native";
import { MapView } from 'expo';

class MapScreen extends Component {
    render(){
        return (
            // expand and fill all the area on the screen with flex 1
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }} />
            </View>
        )
    }
}

export default MapScreen;