import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  BackHandler
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Pause extends Component{
    
   componentDidMount(){
     BackHandler.addEventListener('backPress', () => {
        return true;
   });
   }

   componentWillUnmount() {
    this.updateCycle.clear()
    BackHandler.removeEventListener('backPress');
    }
    
    render(){
        const {navigate} = this.props.navigation ;
        return <View style={styles.container}>
                <Text >Pause </Text>
                <Text >your Score is {this.props.score} </Text>

                <Button title = "Resume" onPress = {()=>this.props.resume()} style={styles.btn} />
                <Button title = "Go to Home" onPress = {()=>navigate('Home')} style={styles.btn} />
                <Button title = "Exit App" onPress = {()=>BackHandler.exitApp()} style={styles.btn} />
               </View>
    }


}