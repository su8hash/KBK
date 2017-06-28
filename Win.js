import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles  from './styles'


export  default class Win extends Component{
    render(){
         const {navigate} = this.props.navigation ;

        return(
            <View style={styles.container}>
                <Text style={styles.bigText}>
                    you have Won the Game .Play Again to increase score
                </Text>
                <Text style={styles.bigText}>
                   {"Your Score : " + this.props.score}
                </Text>
                 <Button title = "Go to Home" onPress = {()=>navigate('Home')} style={styles.btn} />
                 <Button title = "Play Again" onPress = {()=>navigate('Game')} style={styles.btn} />
            </View>
        )
    }
}