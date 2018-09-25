import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Jerbs', color: '#03A9F4' },
    { text: 'Use Jerbs to find a job near you..', color: '#009688' },
    { text: 'Set your location, then get swipin\'', color: '#03A9F4' }
];

class WelcomeScreen extends React.Component {
    // component level state vs redux action creator
    // then check for token and assign
    state = { token: null };

    async componentWillMount(){
        // is async
        let token = await AsyncStorage.getItem('fb_token');

        if(token){
            this.props.navigation.navigate('map');
            // dont need below it worked without it but guy used it so.. meh
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        // props only exist on instances NOT class level like the one in the ReviewScreen
        // react native navigation AUTOMATICALLY passes a prop called navigation to anything it renders
        this.props.navigation.navigate('auth');
    }

    render(){
        // if no token then
        if(_.isNull(this.state.token)){
            return <AppLoading />;
        }
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;