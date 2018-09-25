import React, { Component } from 'react';
import { View, Text, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import * as actions from '../actions'; // do this to have access to all the actions from the actions folder, could also say { facebookLogin } to be specific

class AuthScreen extends React.Component {
    // once this component is rendered to screen
    // call facebookLogin from auth_actions
    componentWillMount(){
        this.props.facebookLogin();
        AsyncStorage.removeItem('fb_token');
    }

    render(){
        return (
            <View>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
            </View>
        );
    }
}

// first argument is always the map state to props -- we dont need any state in auth screen just yet
// second is the action creator, so in this case take all and bind them to AuthScreen
export default connect(null, actions) (AuthScreen);