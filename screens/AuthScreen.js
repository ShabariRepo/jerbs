import React, { Component } from 'react';
import { View, Text, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import * as actions from '../actions'; // do this to have access to all the actions from the actions folder, could also say { facebookLogin } to be specific

class AuthScreen extends React.Component {
    // once this component is rendered to screen
    // call facebookLogin from auth_actions
    componentWillMount(){
        this.props.facebookLogin();
        // to remove the token when authscreen starts
        //AsyncStorage.removeItem('fb_token');

        // we dont know if this is going to work after fb login is complete
        // but not neccessary but if you modify the auth flow in anyway and want to come to this screen after authenticating then sure
        this.onAuthComplete(this.props);
    }

    // anytime the state changes then all the components that are subscribed to redux will have to re-render with new set of props
    // lifecycle method that is called when component is JUST about to be re-rendered
    // captures a case where they successfully log in
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
    }

    // when user completes authorization
    onAuthComplete(props){
        if(props.token){
            // navigation is provided by RN navigation
            this.props.navigation.navigate('map');
        }
    }

    render(){
        return (
            <View />
        );
    }
}

// map state to props : so the auth screen knows what the current authentication state of the user is
// below is state.auth but destructure it to just ask for auth
function mapStateToProps({ auth }){
    return { token: auth.token };
}

// first argument is always the map state to props -- we dont need any state in auth screen just yet
// second is the action creator, so in this case take all and bind them to AuthScreen
export default connect(mapStateToProps, actions) (AuthScreen);