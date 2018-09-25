import React, { Component } from 'react';
import { View, Text } from "react-native";
import { connect } from "react-redux";

class DeckScreen extends Component {
    render(){
        return (
            <View>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
                <Text>DeckScreen</Text>
            </View>
        )
    }
}

// get the jobs piece of state from state
function mapStateToProps({ jobs }){
    // represent jobs as the really the results obj since its what we need
    return { jobs: jobs.results };
}

export default connect(mapStateToProps)(DeckScreen);