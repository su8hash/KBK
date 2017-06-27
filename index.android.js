/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  BackAndroid
} from 'react-native';
import { StackNavigator   } from 'react-navigation';


import Lifeline from './Lifeline';Instructions
import Instructions from './Instructions';
import Game from './Game';

BackAndroid.addEventListener("hardwareBackPress", () => {
  return true;
});

export default class KBK extends Component {
  render() {
    const {navigate} = this.props.navigation ;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Button title = "Go to Game" onPress = {()=>navigate('Instructions')}  style={styles.btn}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


const App = StackNavigator({
  Home : {screen:KBK},
  Game : {screen:Game},
  Instructions : {screen: Instructions},
},
 { 
    headerMode: 'none' 
  }
);

AppRegistry.registerComponent('KBK', () => App);
