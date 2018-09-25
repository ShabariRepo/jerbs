import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                // button tag is from react native el so need to pass in specific style property
                <Button
                    title="Continue"
                    buttonStyle={styles.buttonStyle}
                    //raised //this  draws a while box where the margin is not sure why
                    onPress={this.props.onComplete} // if you put a () on this the callback will be called the instant the button is RENDERED this way its only when pressed
                />
            )
        }
    }

    renderSlides() {
        // slide is the object from welcome screen
        return this.props.data.map((slide, index) => {
            return (
                <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
                    <Text style={styles.slideText}>{slide.text}</Text>

                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        // fill up the whole screen
        flex: 1,
        // text gets rendered at the very center of screen
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    slideText: {
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 40
    }
};

export default Slides;