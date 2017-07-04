import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import styles  from './styles'
import { RevMobManager } from 'react-native-revmob';
import { NativeAppEventEmitter } from 'react-native';


export  default class Loose extends Component{

 constructor(){
     super();
     this.listners = [];
     this.state = {loading:false}
 }

 
 componentWillMount () {
        NativeAppEventEmitter.addListener(
            'onRevmobRewardedVideoDidLoad',
                (e)=>{  RevMobManager.showRewardedVideo() }
        );
  this.listners.push(NativeAppEventEmitter.addListener(
            'onRevmobRewardedVideoDidComplete',
                (e)=>{
                    this.props.retry();
                }
        ));
    }
    // componentDidMount () {
    //     // move to constructor or better in game screen so that video is already loaded
    //     RevMobManager.startSession("5942503155bc0f38cb700ae7", function revMobStartSessionCb(err){
    //         if(!err) RevMobManager.loadRewardedVideo(); // Load rewarded video if session starts successfully.
    //     });
    // }
    componentWillUnmount () {
        // NativeAppEventEmitter.removeAllListeners()
        this.listners.forEach((x)=>x.remove())
    }

   showRewardedVideo(){
        this.setState({loading:false})
        RevMobManager.loadRewardedVideo();
   }

   getRetryWithAdd(){
       if(this.state.loading)
       return <Text>Loading .... </Text>
       else return <Button title = "Watch Video to get another chance" onPress = {()=> this.showRewardedVideo()} style={styles.btn} />
   }

    render(){

        return(
            <View style={styles.container}>
                <Text style={styles.bigText}>
                    you have LOSS .Play Again to increase score
                </Text>
                {this.getRetryWithAdd()}
                 <Button title = "Go to Home" onPress = {()=>this.props.navigateTo('Home')} style={styles.btn} />
                 <Button title = "Play Again" onPress = {()=>this.props.navigateTo('Game')} style={styles.btn} />
            </View>
        )
    }
}