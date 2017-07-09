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
     this.state = {sc:0,mute:false,whoosh:null};
     this.itemsRef = firebaseApp;
     this.top5Scores = null;
     
  
   this.buttonSound = new Sound('btn_sound.mp3', Sound.MAIN_BUNDLE);
   this._handleAppStateChange = this._handleAppStateChange.bind(this);
   this.buttonClicked = this.buttonClicked.bind(this);
  }
  
  buttonClicked(action){
   if(this.buttonSound) this.buttonSound.play();
    action();
  }

componentWillUnmount() {
  AppState.removeEventListener('change', this._handleAppStateChange);
}

_handleAppStateChange(currentAppState) {
  
  if(currentAppState === 'background') {
    if(this.state.whoosh){
      console.warn( "sound");
      this.state.whoosh.pause();
      this.state.whoosh.stop();
    }
  } 
  if(currentAppState === 'active') {
      // this.state.whoosh.stop();
       this.state.whoosh.play();
  }
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

     this.state.whoosh = new Sound('main_music.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
    return;
     } 
  // loaded successfully
     this.state.whoosh.setNumberOfLoops(-1);
     this.state.whoosh.setVolume(0.2);
    this.state.whoosh.play();
  });

    if(this.state.mute){

      // this.whoosh.setVolume(0);
       
    
    }
        
      AppState.addEventListener('change', this._handleAppStateChange);
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
