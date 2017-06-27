import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export  default class Result extends Component{

   constructor(){
       super();
    //    const {navigate,state} = this.props.navigation;
    //    let result = state.props.result;

    //   this.state = {result}

    //    if(result){
    //    setTimeout(()=>this.props.navigation.navigate('Game') )
    //    }
   }

    render(){
      
        return(
            <View>
                <Text>
                    Result is {this.props.result ? "Correct": "Wrong"}
                </Text>
            </View>
        )
    }
}