import React, { Component } from 'react';
import { View, Text, Dimensions } from "react-native";

// this is something that wont change over time so keep it outside
const SCREEN_WIDTH = Dimensions.get('window').width;

class SettingsScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Settings',
        headerStyle: {
            backgroundColor: '#b19cd9',
            height: 50
        },
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            //width: '90%',// to center the text below works too
            //flex: 1,
            left: SCREEN_WIDTH * 0.20 // 25% of screen width            
        },
        headerTintColor: '#fff'        
    });

    render(){
        return (
            <View>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
            </View>
        )
    }
}

export default SettingsScreen;