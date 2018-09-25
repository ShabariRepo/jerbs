import React, { Component } from 'react';
import { View, Text } from "react-native";
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Jerbs', color: '#03A9F4' },
    { text: 'Use Jerbs to find a job near you..', color: '#009688' },
    { text: 'Set your location, then get swipin\'', color: '#03A9F4' }
];

class WelcomeScreen extends React.Component {

    onSlidesComplete = () => {
        // props only exist on instances NOT class level like the one in the ReviewScreen
        // react native navigation AUTOMATICALLY passes a prop called navigation to anything it renders
        this.props.navigation.navigate('auth');
    }

    render(){
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;