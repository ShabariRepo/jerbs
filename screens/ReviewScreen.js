import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, ScrollView, Linking } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from 'react-redux';
import { MapView } from 'expo';

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
            // destructure obj so dont have to keep calling job
            const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = job;

            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.045,
                latitudeDelta: 0.02
            };

            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === 'android'} // android displaying as an image
                            scrollEnabled={false} // no scrolling the map
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply Now"                        
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
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
        marginTop: 10, 
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