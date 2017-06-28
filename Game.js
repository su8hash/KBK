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
import Data from './data.json'
import styles  from './styles'




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
        score:0
    };

    this.updateCycle = null;

    this.instuctionDone = this.instuctionDone.bind(this);
}

componentWillMount(){
}



componentWillUpdate(){
}

componentDidMount(){
     BackHandler.addEventListener('backPress', () => {
        return true;
   });
}

componentWillUnmount() {
    this.updateCycle.clear()
    BackHandler.removeEventListener('backPress');
  }


  instuctionDone(){
      this.setState({instructionVisible:false})
  }

    render(){

        const {navigate} = this.props.navigation ;
        return(
            <View style={styles.container}>
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
                 
                 
                 <View style={styles.ansContainer}>
                 <TouchableHighlight onPress = {()=>this.check('A')}   >
                      <View style={styles.button}>
                     <Text  style={styles.buttonText}>
                       {"A. " + this.state.CurrentSet.A} 
                       </Text> 
                         </View>
                </TouchableHighlight>

                 <TouchableHighlight onPress = {()=>this.check('B')}   >
                     <View style={styles.button}>
                          <Text   style={styles.buttonText}>
                        {"B. " + this.state.CurrentSet.B}
                      </Text> 
                        </View>
                </TouchableHighlight>
                
                </View>


                 <TouchableHighlight onPress = {()=>this.check('C')}   >
                    <View style={styles.button}>
                          <Text   style={styles.buttonText}>
                       {"C. " + this.state.CurrentSet.C}
                          </Text> 
                            </View>
                </TouchableHighlight>

                 <TouchableHighlight onPress = {()=>this.check('D')}   >
                      <View style={styles.button}>
                          <Text  style={styles.buttonText}>
                         {"D. " + this.state.CurrentSet.D}
                          </Text> 
                            </View>
                </TouchableHighlight>

                 {/*<Button  title = {"A. " + this.state.CurrentSet.A} onPress = {()=>this.check('A')} style={styles.btn} />
                 <Button  title = {"B. " + this.state.CurrentSet.B} onPress = {()=>this.check('B')} style={styles.btn} />
                 <Button  title = {"C. " + this.state.CurrentSet.C} onPress = {()=>this.check('C')} style={styles.btn} />
                 <Button  title = {"D. " + this.state.CurrentSet.D} onPress = {()=>this.check('D')} style={styles.btn} />*/}
            
                 <Button title = "Go to Home" onPress = {()=>navigate('Home')} style={styles.btn} />
                 <Button title = "Use a Lifeline" onPress = {()=>navigate('Lifeline')}   style={styles.btn} />
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

                        AsyncStorage.setItem('score', totalScore.toString(),()=>console.warn('saved'),(err)=>console.warn(err));
                       

                        console.warn(totalScore);
                         
                        } catch (error) {
                        // Error saving data
                        console.warn(error);
                        console.warn("not able to store score");
                    }
  }  

   
    check(value){
        if(value){
        let res = false;
        if(value === this.state.CurrentSet.ans){
            res = true;
        }
       
       
        this.setState({resultVisibility:true,result:res});
        this.updateCycle = setTimeout(()=> {
            if(this.state.i == 14){
                //game has completed
            this.saveScore();
                    
            this.props.navigation.navigate('Win')

            }
             else{
            let a = this.state.i + 1;
            const j = "q" + a;
            let sc = this.state.score;
            if(sc === 0) sc = 50
            else sc = sc * 2;
            this.setState({resultVisibility:false,
                           i : a ,
                           CurrentSet :  Data[j][0],
                           score: sc});}
                         },1010); 
       }
    }
}