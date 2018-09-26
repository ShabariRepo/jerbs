import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from 'react-redux';

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

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            return (
                <Card>
                    <View style={{ heigher: 200 }}>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                        </View>
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: { 
        marginBottom: 10,
        flexDirection: 'row', // kind of like a bootstrap row
        justifyContent: 'space-around'        
    },
    italics: {
        fontStyle: 'italic'
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);