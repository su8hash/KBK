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
  BackHandler,
  TouchableHighlight,
  AsyncStorage,
  FlatList,
  AppState
} from 'react-native';
import { StackNavigator   } from 'react-navigation';
import OneSignal from 'react-native-onesignal'; 
import Sound from 'react-native-sound'

import Lifeline from './Lifeline';Instructions
import Instructions from './Instructions';
import Game from './Game';
import Win from './Win';
import Loose from './Loose';
import Pause from './Pause';
import styles  from './styles'

import firebaseApp  from './fireBaseHelper'

console.ignoredYellowBox = [
    'Setting a timer'
]

BackHandler.addEventListener("backPress", () => {
  BackHandler.exitApp()
});

export default class KBK extends Component {
          
   constructor(){
     super();
     this.state = {sc:0,buttonSound:null};
     this.itemsRef = firebaseApp;
     this.top5Scores = null;

     
  
   this.buttonClicked = this.buttonClicked.bind(this);
  }
  
  buttonClicked(action){
   if(this.state.buttonSound) this.state.buttonSound.play();
    action();
  }

componentWillUnmount() {
  
  if(this.state.buttonSound) this.state.buttonSound.release();
}


    componentWillMount() {
      
        OneSignal.inFocusDisplaying(2);
    }

    componentWillUpdate(){
      
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
    this.state.buttonSound = new Sound('btn_sound.mp3', Sound.MAIN_BUNDLE);
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
     return <View style={styles.topScore}>
         <Text >Top 5 Scores</Text>
         <FlatList style={styles.list}
           data= {this.state.top5Scores}
           renderItem={({item}) => <View style={styles.topScoreList}>
               <Text style={styles.scoreContainer}> {item.name } </Text>
               <Text > : </Text>
               <Text style={[styles.scoreContainer,{width:50,textAlign:'left'}]}> {item.score}</Text>
               </View>
               }
        />
        </View>
     }
     else
     return <Text>Loading High Scores</Text>;   
   }

   render() {
    const {navigate} = this.props.navigation ;
    return (
      <View style={styles.gameContainer}>
        {this.getHighScoreView()}
        <View>
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
        <TouchableHighlight onPress = {()=>this.buttonClicked(() => navigate('Instructions'))} style={styles.buttonStyle} >
          <View >
               <Text   style={styles.buttonText}>
                  Go to Game
                 </Text>
          </View>
          </TouchableHighlight>
         <TouchableHighlight onPress = {()=> this.buttonClicked(() => BackHandler.exitApp())} style={styles.buttonStyle} >
          <View >
               <Text   style={styles.buttonText}>
                   Exit
                 </Text>
          </View>
          </TouchableHighlight>
          </View>
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
  Pause : {screen:Pause}
},
 { 
    headerMode: 'none' 
  }
);

AppRegistry.registerComponent('KBK', () => App);
