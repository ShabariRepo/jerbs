import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderSlides() {
        // slide is the object from welcome screen
        return this.props.data.map((slide) => {
            return (
                <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
                    <Text style={styles.slideText}>{slide.text}</Text>
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
    }
};

export default Slides;