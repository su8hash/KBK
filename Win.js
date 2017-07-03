import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  BackHandler
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles  from './styles'
import firebaseApp  from './fireBaseHelper'


export  default class Win extends Component{
   
   constructor(props){
       super(props);
       const prop = this.props.navigation.state.params;
       this.state = { text: 'P1' ,score : prop.score,  top5Scores : prop.top5Scores };
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

    promptForUserName(){
      
        if(this.state.score > this.state.top5Scores[4].score){
            return <View>
                <Text>Hey would you like to update your score in top 5 scorer.Enter your name</Text>
                <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({text})}
                             value={this.state.text}></TextInput>
                 <Button title="Update" onPress={()=>this.updateScore()}/>            
               </View>
        }
        return null;
    }


    updateScore(){
       
        this.state.top5Scores[4].score = this.state.score;
        this.state.top5Scores[4].name = this.state.text;
        this.state.top5Scores.sort((a,b)=> a.score > b.score);
        firebaseApp.set(this.state.top5Scores);
    }
    
    render(){
        const {navigate} = this.props.navigation ;
        return(
            <View style={styles.container}>
                <Text style={styles.bigText}>
                    you have Won the Game .Play Again to increase score
                </Text>
                <Text style={styles.bigText}>
                   {"Your Score : " + this.props.navigation.state.params.score}
                </Text>
                 {this.promptForUserName()}
                 <Button title = "Go to Home" onPress = {()=>navigate('Home')} style={styles.btn} />
                 <Button title = "Play Again" onPress = {()=>navigate('Game')} style={styles.btn} />
            </View>
        )
    }
}