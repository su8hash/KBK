import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  BackHandler
} from 'react-native';

export default class Pause extends Component{
    
   componentDidMount(){
     console.warn("C2")
  //    BackHandler.addEventListener('backPress', () => {
  //     this.props.resume();
  //            console.warn("back handler is registerred 222")

  //     return true;
  //  });
   }

   componentWillUnmount() {
     console.warn("D2")
    
    // BackHandler.removeEventListener('backPress');
    //        console.warn("back handler is unregisterred 2222")

    }
    
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