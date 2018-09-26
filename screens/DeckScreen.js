import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from "react-native";
import { connect } from "react-redux";
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';

import Swipe from '../components/Swipe';

// this is something that wont change over time so keep it outside
const SCREEN_HEIGHT = Dimensions.get('window').height;

class DeckScreen extends Component {
    renderCard(job) {
        // get the lat long for the map view
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        };

        return (
            <Card title={job.jobtitle}>
                <View style={{ height: SCREEN_HEIGHT * 0.4 }}>
                    <MapView
                        scrollEnabled={false} // no scrolling the map
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android' ? true : false} // cache true will show the map as an image and NOT as a map for performance // MORE for android its weird without this
                        initialRegion={initialRegion}
                    >

                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {/* escape the bold tags */}
                    {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </Text>
            </Card>
        );
    }

    renderNoMoreCards() {
        return (
            <Card title="No more jobs"></Card>
        );
    }

    render() {
        return (
            <View>
                <Swipe
                    // this is the jobs from below
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    // specify what to use as an id
                    keyProp="jobkey"
                />
            </View>
        )
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row', // get them to show up on same row
        justifyContent: 'space-around',
        marginBottom: 10
    }
};

// get the jobs piece of state from state
function mapStateToProps({ jobs }) {
    // represent jobs as the really the results obj since its what we need
    return { jobs: jobs.results };
}

export default connect(mapStateToProps)(DeckScreen);