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
  BackAndroid,
  TouchableHighlight,
  AsyncStorage,
  FlatList
} from 'react-native';
import { StackNavigator   } from 'react-navigation';
import OneSignal from 'react-native-onesignal'; 


import Lifeline from './Lifeline';Instructions
import Instructions from './Instructions';
import Game from './Game';
import Win from './Win';
import Loose from './Loose';
import styles  from './styles'

import firebaseApp  from './fireBaseHelper'

console.ignoredYellowBox = [
    'Setting a timer'
]

BackAndroid.addEventListener("hardwareBackPress", () => {
  return true;
});

export default class KBK extends Component {
          
   constructor(){
     super();
     this.state = {sc:0};
     this.itemsRef = firebaseApp;
     this.top5Scores = null;
  
   }


    componentWillMount() {
        OneSignal.inFocusDisplaying(2);
    }

 componentDidMount(){
     try {
          const value = AsyncStorage.getItem('score',(err,value)=>{
          if (value  !== null){
            this.setState({ sc : parseInt(value)});
          }},(err)=>console.warn(err));
        } catch (error) {
            console.warn(error);
        }

    this.getHighScores(this.itemsRef);
   }

   getHighScores(itemRef){
       this.itemsRef.once('value').then((snap)=>{
       let items = [];
       snap.forEach(function(element) {
         items.push({name:element.val().name,score: element.val().score,key:element.val().key});
       });

       this.setState({top5Scores:items})
     });
   }


   getHighScoreView(){
     if(this.state.top5Scores){
     return <FlatList
           data= {this.state.top5Scores}
           renderItem={({item}) => <Text> {item.name+ " : " + item.score}</Text>}
        />
     }
     else
     return <Text>Loading High Scores</Text>;   
   }

   render() {
    const {navigate} = this.props.navigation ;
    return (
      <View style={styles.container}>
        {this.getHighScoreView()}
        <Text style={styles.welcome}>
          Welcome to React Native! {this.state.sc}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress = {()=>navigate('Instructions')} >
          <View style={styles.button}>
               <Text   style={styles.buttonText}>
                 Go to Game
                 </Text>
          </View>
          </TouchableHighlight>
      </View>
    );
  }
}




const App = StackNavigator({
  Home : {screen:KBK},
  Game : {screen:Game},
  Instructions : {screen: Instructions},
  Win : {screen: Win},
  Loose : {screen:Loose},
},
 { 
    headerMode: 'none' 
  }
);

AppRegistry.registerComponent('KBK', () => App);
