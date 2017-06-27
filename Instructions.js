import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Game from './Game';

export default class Instructions extends Component{
    render(){
  const {navigate} = this.props.navigation ;
        return(
            <View>
                <Text>
                   Please Read This instuction These are different.
                   There Will be Total 14 Question
                   First Question will Give you 50 points and points will double on every question
                   There are  three lifeline 
                   1) 50 - 50 (remove two wrong answers)
                   2) Double Try (You can try two answers)
                   3) Flip (You can change question before answering it)
                </Text>
                 <Button title = "Ok" onPress = {()=>navigate('Game')}  />
            </View>
        )
    }
}