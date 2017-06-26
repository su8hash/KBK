import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Lifeline extends Component{
    render(){

        const {navigate} = this.props.navigation ;
        return(
            <View>
                <Text>
                    Lifeline
                </Text>
            </View>
        )
    }
}