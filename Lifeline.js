import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { RevMobManager } from 'react-native-revmob';
import { NativeAppEventEmitter } from 'react-native';   

export default class Lifeline extends Component{

componentWillMount () {
        NativeAppEventEmitter.addListener(
            'onRevmobRewardedVideoDidLoad',
                (e)=>{  RevMobManager.showRewardedVideo() }
        );
  this.listners.push(NativeAppEventEmitter.addListener(
            'onRevmobRewardedVideoDidComplete',
                (e)=>{
                     // When Running Out of Lifeline Show a video and give option to revive any one helpline
                }
        ));
    }
   
    componentWillUnmount () {
        this.listners.forEach((x)=>x.remove())
    }

   showRewardedVideo(){
        this.setState({loading:false})
        RevMobManager.loadRewardedVideo();
   }

    render(){
        return(
            <View style={styles.container}>
                <Text>
                    Lifeline
                </Text>
                 {this.get5050()}
                 {this.getFlip()}
                 {this.getDoubleDip()}
                 {this.getCancel()}
                 
            </View>
        )
    }

    get5050(){
        if(this.props.availableLifeline.indexOf('5') > -1)
             return    <Button title = "50/50" onPress = {()=>this.props.chooseLifeline('5')} style={styles.btn} />
        else return null;
    }

    getFlip(){
        if(this.props.availableLifeline.indexOf('F') > -1)
               return <Button title = "Flip" onPress = {()=>this.props.chooseLifeline('F')} style={styles.btn} />
        else return null;
    }

    getDoubleDip(){
        if(this.props.availableLifeline.indexOf('D') > -1)
                 return <Button title = "Double Dip" onPress = {()=>this.props.chooseLifeline('D')} style={styles.btn} />
        else return null;
    }

      getCancel(){
          // get More lifeline by watching add
        if(this.props.availableLifeline.length == 0)
          return     <View>
                     <Text>You have used all Lifelines</Text>
                     <Button title = "Watch Video to revive any One Lifeline" onPress = {()=> this.showRewardedVideo()} style={styles.btn} />
                     <Button title = "Cancel" onPress = {()=>this.props.chooseLifeline()} style={styles.btn} />
               </View>
        else 
             return    <Button title = "Cancel" onPress = {()=>this.props.chooseLifeline()} style={styles.btn} />
        
    }
}