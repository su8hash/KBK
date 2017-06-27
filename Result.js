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
                    Result is {this.state}
                </Text>
                 {this.getRetryView()}
            </View>
        )
    }

    getRetryView(){
        if(this.state) return null;
        
        return (
            <View>
                <Text>  Seems Like you failed  </Text>
                   <Button title = "Go Back to Game" onPress = {()=>this.props.action()}  />
                   <Button title = "Exit" onPress = {()=>this.props.navigation.navigate('Home')}  />
            </View>
        )
    }
}