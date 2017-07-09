import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Sound from 'react-native-sound'

import Game from './Game';
import styles  from './styles'


export default class Instructions extends Component{
    constructor(){
        super();
         this.buttonSound = new Sound('btn_sound.mp3', Sound.MAIN_BUNDLE);
         this.buttonClicked = this.buttonClicked.bind(this);
    }

     buttonClicked(action){
         if(this.buttonSound) this.buttonSound.play();
        action();
  }

    render(){
       
        const {navigate} = this.props.navigation ;
        return(
            <View style={styles.instructionContainer}>
                <Text style={styles.instructions}>
                   Please Read This instuction These are different.
                   </Text>
                 <Text style={styles.instructions}>  There Will be Total 14 Question</Text>
                <Text style={styles.instructions}>   First Question will Give you 50 points and points will double on every question</Text>
                <Text style={styles.instructions}>   There are  three lifeline </Text>
                <Text style={styles.instructions}>   1) 50 - 50 (remove two wrong answers)
                   2) Double Try (You can try two answers)
                   3) Flip (You can change question before answering it)
                </Text>


             
              <TouchableHighlight onPress = {()=>this.buttonClicked(() => navigate('Game'))} style={styles.buttonStyle} >
                        <View >
                           <Text   style={styles.buttonText}>
                            Let's Play
                            </Text>
                        </View>
          </TouchableHighlight>             
            </View>
        )
    }
}