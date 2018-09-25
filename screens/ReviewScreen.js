import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from "react-native";
import { Button } from "react-native-elements";

// this is something that wont change over time so keep it outside
const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviewScreen extends Component {
    // this is called an instance property
    // add this property to every instance of this screen created
    //state = { color: 'red'}

    // this is a class property similar to above
    // but its static, adding static will set the property to the CLASS itself NOT the instance
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Review Jobs',
        headerStyle: {
            backgroundColor: '#b19cd9',
            //height: 50,
            marginTop: Platform.OS === 'android' ? 24 : 0, // orig 24
            //paddingBottom: Platform.OS === 'android' ? 15 : 0
        },
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            //width: '90%',// to center the text below works too
            //flex: 1
            left: SCREEN_WIDTH * 0.30 // 25% of screen width            
        },
        headerTintColor: '#fff'
        , headerRight: (
            <Button
                title="Settings"
                onPress={() => navigation.navigate('settings')}
                backgroundColor="rgba(0,0,0,0.05)"
            ></Button>
        )
    });

    render() {
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        )
    }
}

export default ReviewScreen;