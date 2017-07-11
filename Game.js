import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Modal,
  Button,
  TouchableHighlight,
  AsyncStorage,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { RevMobManager } from 'react-native-revmob';
import { NativeAppEventEmitter } from 'react-native';
import Sound from 'react-native-sound'


import Result from './Result';
import Loose from './Loose';
import Lifeline from './Lifeline';
import Pause from './Pause';
import score from './score.png';
import home from './5050.png';

import Data from './data.json'
import styles  from './styles'
import firebaseApp  from './fireBaseHelper'





export default class Game extends Component{

constructor(){
    super();
    this.state = {
        a: 1,
        instructionVisible:true,
        i: 1,
        CurrentSet: Data.q1[0],
        resultVisibility:false,
        result:false,
        score:0,
        looseCondition:null,
        looseVisible:false,
        lifelineVisible:false,
        activeLifeline:null,
        showA:true,
        showB:true,
        showC:true,
        showD:true,
        doubleDip : false,
        availableLifeline : ['5','D','F'],
        lifelineInProgress:false,
        queNo:1,
        pauseVisible:false,
        buttonSound:null,
        clapSound:null,
        awwSound:null,
    };

    this.updateCycle = [];
    this.listners = [];
    this.itemsRef = firebaseApp;
    this.top5Scores = [];
    

    this.instuctionDone = this.instuctionDone.bind(this);
    this.retry = this.retry.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.chooseLifeline = this.chooseLifeline.bind(this);
    this.resume = this.resume.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
}

   buttonClicked(action){
         if(this.state.buttonSound) this.state.buttonSound.play();
    action();
  }

componentDidMount(){
     this.state.clapSound = new Sound('win_clap.mp3', Sound.MAIN_BUNDLE);
     this.state.awwSound = new Sound('aww_loose.mp3', Sound.MAIN_BUNDLE);
     this.state.buttonSound = new Sound('btn_sound.mp3', Sound.MAIN_BUNDLE);
     
      BackHandler.addEventListener('backPress', () => {
       this.setState({pauseVisible:!this.state.pauseVisible});
        return true;
   });
    this.getHighScores(this.itemsRef);
     RevMobManager.startSession("5942503155bc0f38cb700ae7", function revMobStartSessionCb(err){
            if(!err) RevMobManager.loadBanner(); // Load rewarded video if session starts successfully.
        });
    this.listners.push( NativeAppEventEmitter.addListener('onRevmobBannerDidReceive', () => {
      RevMobManager.showBanner(); // Show banner if it's loaded
    }));

     this.listners.push(  NativeAppEventEmitter.addListener(
            'onRevmobFullscreenDidReceive',
                (e)=>{ RevMobManager.showPreLoadedFullscreen(); }
        ));
}

  getHighScores(itemRef){
       this.itemsRef.once('value').then((snap)=>{
       let items = [];
       snap.forEach(function(element) {
          items.push({name:element.val().name,score: element.val().score,key:element.val().key});
       });

       this.top5Scores=items;
     });
   }

componentWillUnmount() {
    this.updateCycle.clear()
    BackHandler.removeEventListener('backPress');

    this.listners.forEach((x)=>x.remove());    
     if(this.state.clapSound) this.state.clapSound.release();
     if(this.state.awwSound) this.state.awwSound.release();
     if(this.state.buttonSound) this.state.buttonSound.release();
  }


  instuctionDone(){
      this.setState({instructionVisible:false})
  }

  retry(){
   this.setState({looseVisible:false});
  }

  navigateTo(screenName){
     if(this.state.buttonSound)this.state.buttonSound.play();
       this.setState({looseVisible:false});
       this.saveScore();
       this.props.navigation.navigate(screenName) 
  }

  resume(){
    this.setState({pauseVisible:false});
  }

  chooseLifeline(lifeline){
  this.setState({lifelineVisible:false});
  if(lifeline){

      this.setState({activeLifeline : lifeline,lifelineInProgress:true});
      var tempArray = this.state.availableLifeline;
      var index = tempArray.indexOf(lifeline);
      if (index > -1) {
        tempArray.splice(index, 1);
       }

      this.setState({availableLifeline:tempArray});
      switch(lifeline){
          case '5':
          const candidateToRemoval = ['A','B','C','D'];
          let ansIndex = candidateToRemoval.indexOf(this.state.CurrentSet.ans);
          candidateToRemoval.splice(ansIndex,1);
          let random1 = Math.floor(Math.random()*2);
          candidateToRemoval.splice(random1,1);
          candidateToRemoval.forEach((item)=>{
           let q = "show"+item;
           this.setState({[q]:false});
          })
          break;
          case 'F':
            this.getNextQue();
          break;
          case 'D':
           this.setState({doubleDip:true})
          break;
      }
  }
}

getAnsA(){
     if(this.state.showA)
            return (
              <TouchableHighlight onPress = {()=>this.check('A')}  style={styles.buttonStyle}   >
                      <View style={styles.button}>
                            <Text  style={styles.buttonText}>
                                {"A. " + this.state.CurrentSet.A} 
                            </Text> 
                      </View>
                </TouchableHighlight>)
                else
                return null;
}
 

getAnsB(){
     if(this.state.showB)
            return (
              <TouchableHighlight onPress = {()=>this.check('B')}    style={styles.buttonStyle} >
                      <View style={styles.button}>
                            <Text  style={styles.buttonText}>
                                {"B. " + this.state.CurrentSet.B} 
                            </Text> 
                      </View>
                </TouchableHighlight>)
                else
                return null;
}

getAnsC(){
     if(this.state.showC)
            return (
              <TouchableHighlight onPress = {()=>this.check('C')}     style={styles.buttonStyle}>
                      <View style={styles.button}>
                            <Text  style={styles.buttonText}>
                                {"C. " + this.state.CurrentSet.C} 
                            </Text> 
                      </View>
                </TouchableHighlight>)
                else
                return null;
}

getAnsD(){
     if(this.state.showD)
            return (
              <TouchableHighlight onPress = {()=>this.check('D')}    style={styles.buttonStyle}>
                      <View style={styles.button}>
                            <Text  style={styles.buttonText}>
                                {"D. " + this.state.CurrentSet.D} 
                            </Text> 
                      </View>
                </TouchableHighlight>)
                else
                return null;
}

getLifeLinebutton(){
    if(!this.state.lifelineInProgress)
       return <Button title = "Use a Lifeline" onPress = {()=>this.buttonClicked(()=>this.setState({lifelineVisible:true}))}   style={styles.btn} />
    else  switch(this.state.activeLifeline){
          case '5':
          return <Text>50/50 in progress</Text>
          case 'F':
             return <Text>Flip in progress</Text>
          case 'D':
            return <Text>Double Dip in progress</Text>
      }
}


getNextQue(changeIndex){
            if(changeIndex)this.setState({queNo:this.state.queNo + 1});
            let a = this.state.i + 1;
            const j = "q" + a;
            this.setState({i:a});
            this.setState({CurrentSet :  Data[j][0],
                           showA:true,
                           showB:true,
                           showC:true,
                           showD:true
                        });
}

    render(){

        const {navigate} = this.props.navigation ;
        return(
            <View style={styles.instructionContainer}>
                  <Modal
                  onRequestClose={() => {this.setState({pauseVisible:!this.state.pauseVisible})}}
                  visible={this.state.pauseVisible} 
                  animationType={"slide"}
                  transparent={true}
                  >
                  <Pause resume={this.resume} navigateTo ={this.navigateTo}/>
                  </Modal>

                  <Modal
                  onRequestClose={() => {this.chooseLifeline()}}
                  visible={this.state.lifelineVisible} 
                  animationType={"slide"}
                  transparent={true}
                  >
                    <Lifeline chooseLifeline={this.chooseLifeline} availableLifeline ={this.state.availableLifeline}/>
                  </Modal> 
                
                <Modal
                  onRequestClose={() => {this.setState({looseVisible:false})}}
                  visible={this.state.looseVisible} 
                  animationType={"slide"}
                  transparent={true}
                  >
                    <Loose retry={this.retry} navigateTo ={this.navigateTo}/>
                </Modal> 
               
                <Modal
                  onRequestClose={() => {null}}
                  visible={this.state.resultVisibility} 
                  animationType={"slide"}
                  transparent={true}
                  >
                    <Result result={this.state.result} score={this.state.score}/>
                </Modal>
                
                 
                 <View style={styles.topHeader}>

                 <View style={styles.currentScore}>
                  <Image source={URL=score} style={{height:25,width:75}} ></Image>
                 <Text style={styles.bigText}>{this.state.score}</Text>
                 </View>
                
                  <View style={styles.currentScore}> 
                  {this.getLifeLinebutton()}

                <TouchableHighlight onPress = {()=>this.buttonClicked(() => navigate('Home'))}>
                      <View style={styles.imageText}>
                            <Image source={URL=home} style={{height:45,width:75}} ></Image>
                            <Text  style={styles.buttonText}>
                                Home 
                            </Text> 
                      </View>
                </TouchableHighlight>

                  </View>

                 </View>
                


                <View style={styles.questionConatainer}>
                 <Text style={styles.bigText} numberOfLines={3}>{this.getQueText()}</Text>
                 </View>

                <View style={styles.ansContainer}> 
                 <View style={styles.containerGameRight}> 
                     {this.getAnsA()}
                     {this.getAnsB()}
                </View>
                <View style={styles.containerGameRight}> 
                    {this.getAnsC()}
                    {this.getAnsD()}
                </View>
                </View> 
            </View>
        )
    }
   
 getQueText(){
   return "Q" + this.state.queNo + ". " + this.state.CurrentSet.que
 }

   saveScore(a){
         try {
                        let totalScore = this.state.score;
                        AsyncStorage.getItem('score',(err,value) => {
                            if(value !== null)
                            totalScore = totalScore + parseInt(value); 
                         });

                        AsyncStorage.setItem('score', totalScore.toString(),null,(err)=>console.warn(err));
                        } catch (error) {
                        // Error saving data
                        console.warn(error);
                    }
  }  

   
    check(value){
        if(value){
        let res = false;

       switch(value){
          case 'A':
            this.setState({showA:false});
            break;
          case 'B':
            this.setState({showB:false});
            break;
          case 'C':
            this.setState({showC:false});
            break;
          case 'D':
            this.setState({showD:false});
            break;
       }




        if(value === this.state.CurrentSet.ans){

    if(this.state.clapSound) 
          {
            this.state.clapSound.play();
          }
              let sc = this.state.score;
            if(sc === 0) sc = 50
            else sc = sc * 2;
            this.setState({score:sc});
            res = true;
        }
        else if(this.state.doubleDip){
            this.setState({doubleDip:false});
            return;
        }
       
        if(!res && this.state.awwSound) 
          {
            this.state.awwSound.play();
          }

        this.setState({resultVisibility:true,result:res,lifelineInProgress:false});
        this.updateCycle.forEach((x)=>clearTimeout(x));
        this.updateCycle.push(setTimeout(()=> {
           
        if(this.state.queNo % 6 == 0)   
         RevMobManager.loadFullscreen();

         if(this.state.result){
            this.setState({resultVisibility:false});
            if(this.state.queNo == 14){
            this.saveScore();
            this.props.navigation.navigate('Win',{top5Scores: this.top5Scores,score:this.state.score})
              }
            else  this.getNextQue(true);
         }
         else
         {
             // incorrrect answer
              this.setState({resultVisibility:false,looseVisible:true});
         }

           this.updateCycle.forEach((x)=>clearTimeout(x));
          },500))
       }
    }
}