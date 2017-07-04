import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  BackHandler
} from 'react-native';

export default class Pause extends Component{
    render(){
        return <View style={styles.container}>
                <Text >Pause </Text>
                <Text >your Score is {this.props.score} </Text>

                <Button title = "Resume" onPress = {()=> this.props.resume()} style={styles.btn} />
                <Button title = "Go to Home" onPress = {()=>this.props.navigateTo('Home')} style={styles.btn} />
                <Button title = "Exit App" onPress = {()=>BackHandler.exitApp()} style={styles.btn} />
               </View>
    }


}