import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Modal,
  Button,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';


import Result from './Result';
import Loose from './Loose';
import Lifeline from './Lifeline';

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
    };

    this.updateCycle = [];


   this.itemsRef = firebaseApp;

    this.instuctionDone = this.instuctionDone.bind(this);
    this.retry = this.retry.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.chooseLifeline = this.chooseLifeline.bind(this);
    this.top5Scores = [];
}

componentWillMount(){
}



componentWillUpdate(){
}

componentDidMount(){
     BackHandler.addEventListener('backPress', () => {
        return true;
   });
    this.getHighScores(this.itemsRef);
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
  }


  instuctionDone(){
      this.setState({instructionVisible:false})
  }

  retry(){
   this.setState({looseVisible:false});
  }

  navigateTo(screenName){
       this.setState({looseVisible:false});
       this.saveScore();
       this.props.navigation.navigate(screenName) 
  }

  chooseLifeline(lifeline){
  this.setState({lifelineVisible:false});
  if(lifeline){
      this.setState({activeLifeline : lifeline});

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
              <TouchableHighlight onPress = {()=>this.check('A')}   >
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
              <TouchableHighlight onPress = {()=>this.check('B')}    >
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
              <TouchableHighlight onPress = {()=>this.check('C')}    >
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
              <TouchableHighlight onPress = {()=>this.check('D')}   >
                      <View style={styles.button}>
                            <Text  style={styles.buttonText}>
                                {"D. " + this.state.CurrentSet.D} 
                            </Text> 
                      </View>
                </TouchableHighlight>)
                else
                return null;
}


getNextQue(changeIndex){
         let a = this.state.i + 1;
            const j = "q" + a;
            if(changeIndex)this.setState({i:a});
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
            <View >

                  <Modal
                  onRequestClose={() => {null}}
                  visible={this.state.lifelineVisible} 
                  animationType={"slide"}
                  transparent={true}
                  >
                    <Lifeline chooseLifeline={this.chooseLifeline}/>
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
                
             


                 <Text style={styles.bigText}>{"Score : " + this.state.score}</Text>
                 <Text style={styles.bigText}>{"Q" + this.state.i + ". " + this.state.CurrentSet.que}</Text>
                 
                <View> 
                {this.getAnsA()}
                {this.getAnsB()}
                {this.getAnsC()}
                {this.getAnsD()}
                </View> 
                

                 {/*<Button  title = {"A. " + this.state.CurrentSet.A} onPress = {()=>this.check('A')} style={styles.btn} />
                 <Button  title = {"B. " + this.state.CurrentSet.B} onPress = {()=>this.check('B')} style={styles.btn} />
                 <Button  title = {"C. " + this.state.CurrentSet.C} onPress = {()=>this.check('C')} style={styles.btn} />
                 <Button  title = {"D. " + this.state.CurrentSet.D} onPress = {()=>this.check('D')} style={styles.btn} />*/}
                 <Button title = "Use a Lifeline" onPress = {()=>this.setState({lifelineVisible:true})}   style={styles.btn} />
                 <Button title = "Go to Home" onPress = {()=>navigate('Home')} style={styles.btn} />
            </View>
        )
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
       
       
        this.setState({resultVisibility:true,result:res});
         this.updateCycle.forEach((x)=>clearTimeout(x));
        this.updateCycle.push(setTimeout(()=> {
           
         if(this.state.result){
            this.setState({resultVisibility:false});
            if(this.state.i == 2){
            this.saveScore();
            this.props.navigation.navigate('Win',{top5Scores: this.top5Scores,score:this.state.score})
              }
            else  this.getNextQue();
         }
         else
         {
             // incorrrect answer
              this.setState({resultVisibility:false,looseVisible:true});
         }

           this.updateCycle.forEach((x)=>clearTimeout(x));
          },1000))
       }
    }
}