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

 componentWillMount () {
        // NativeAppEventEmitter.addListener(
        //     'onRevmobRewardedVideoDidLoad',
        //         (e)=>{ RevMobManager.showRewardedVideo(); }
        // );
        NativeAppEventEmitter.addListener(
            'onRevmobRewardedVideoComplete',
                (e)=>{
                    this.props.retry();
                }
        );
    }
    componentDidMount () {
        // move to constructor or better in game screen so that video is already loaded
        RevMobManager.startSession("5942503155bc0f38cb700ae7", function revMobStartSessionCb(err){
            if(!err) RevMobManager.loadRewardedVideo(); // Load rewarded video if session starts successfully.
        })
    }
    componentWillUnmount () {
        NativeAppEventEmitter.removeAllListeners()
    }


    render(){

        return(
            <View style={styles.container}>
                <Text style={styles.bigText}>
                    you have LOSS .Play Again to increase score
                </Text>
                 <Button title = "Watch Video to get anotherc chance" onPress = {()=> RevMobManager.showRewardedVideo()} style={styles.btn} />
                 <Button title = "Go to Home" onPress = {()=>this.props.navigateTo('Home')} style={styles.btn} />
                 <Button title = "Play Again" onPress = {()=>this.props.navigateTo('Game')} style={styles.btn} />
            </View>
        )
    }
}