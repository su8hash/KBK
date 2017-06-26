import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class UserPrompt extends Component{
    render(){

        return(
            <View>
                <Text>
                    User Promt
                </Text>
                 <Button title = "Ok" onPress = {()=>this.props.instuctionDone()}  />
            </View>
        )
    }
}