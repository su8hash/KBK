import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class Result extends Component{
    render(){

        const {navigate} = this.props.navigation ;
        return(
            <View>
                <Text>
                    Result
                </Text>
            </View>
        )
    }
}