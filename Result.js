import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles  from './styles'


export  default class Result extends Component{
    render(){
      
        return(
            <View style={styles.container}>
                <Text style={styles.bigText}>
                    {this.props.result ? "Correct": "Wrong"}
                </Text>
                <Text style={styles.bigText}>
                   {"Your Score : " + this.props.score}
                </Text>
            </View>
        )
    }
}