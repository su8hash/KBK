import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class Lifeline extends Component{
    render(){

        return(
            <View style={styles.container}>
                <Text>
                    Lifeline
                </Text>
                 <Button title = "50/50" onPress = {()=>this.props.chooseLifeline('5')} style={styles.btn} />
                 <Button title = "Flip" onPress = {()=>this.props.chooseLifeline('F')} style={styles.btn} />
                 <Button title = "Double Dip" onPress = {()=>this.props.chooseLifeline('D')} style={styles.btn} />
                 <Button title = "Cancel" onPress = {()=>this.props.chooseLifeline()} style={styles.btn} />
            </View>
        )
    }
}