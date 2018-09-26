import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from "react-native";
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { clearLikedJobs } from '../actions';

// this is something that wont change over time so keep it outside
const SCREEN_WIDTH = Dimensions.get('window').width;

class SettingsScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Settings',
        headerStyle: {
            backgroundColor: '#b19cd9',
            //height: 50
            marginTop: Platform.OS === 'android' ? 24 : 0, // orig 24
            //paddingBottom: Platform.OS === 'android' ? 15 : 0
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
                <Button
                    title="Clear Saved Jobs"
                    large
                    icon={{ name: 'delete-forever' }}
                    backgroundColor="#F44336"
                    onPress={this.props.clearLikedJobs}
                />
            </View>
        );
    }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);