import React, { Component } from 'react';
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';

import Swipe from '../components/Swipe';

class DeckScreen extends Component {
    renderCard(job){
        return (
            <Card title={job.jobtitle}>
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

    render(){
        return (
            <View>
                <Swipe 
                    // this is the jobs from below
                    data={this.props.jobs}
                    renderCard={this.renderCard}                                        
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
function mapStateToProps({ jobs }){
    // represent jobs as the really the results obj since its what we need
    return { jobs: jobs.results };
}

export default connect(mapStateToProps)(DeckScreen);