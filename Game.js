import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Modal,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import UserPrompt from './UserPrompt';
import Result from './Result';
import Data from './data.json'



export default class Game extends Component{

constructor(){
    super();
    this.state = {
        a: 1,
        instructionVisible:true,
        i: 0,
        CurrentSet: Data.q1[0],
        resultVisibility:false,
    };

    this.instuctionDone = this.instuctionDone.bind(this);
    // this.state.CurrentSet  = Data.q1[i]
}

componentWillMount(){
 // console.warn(Data.q1[0].que);
  
}



componentWillUpdate(){
  // console.warn(Data.q1[i]);
    // this.setState({ i : this.state.i++ }); 
    // console.warn(this.state.i);
    // const j = "q" + this.state.i;
    // this.setState({ CurrentSet : Data.j[this.state.i] }); 
}

componentDidMount(){
     BackHandler.addEventListener('backPress', () => {
        return true;
   });


    // this.setState({ i : this.state.i++ }); 
    // console.warn(this.state.i);
    // const j = "q" + this.state.i;
    // this.setState({ CurrentSet : Data.j[this.state.i] }); 
  
    // if(this.props.navigation.state.props.retry){
    //     // give a retry
    // }

   
}

componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
  }


  instuctionDone(){
      this.setState({instructionVisible:false})
  }

    render(){

        const {navigate} = this.props.navigation ;


    // this.State.i  = this.state.i++ ; 
    // console.warn(this.state.i);
    // const j = "q" + this.state.i;
    // this.State.CurrentSet = Data.j[this.state.i]; 
       
      


        return(
            <View>
     
{/*
             <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.instructionVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
           <UserPrompt instuctionDone = {this.instuctionDone}/>
          </Modal>*/}




                <Modal
                  visible={this.state.resultVisibility}  >
                    <Result/>
                </Modal>



                 <Text>{this.state.CurrentSet.que}</Text>
                 <Button title = {this.state.CurrentSet.A} onPress = {()=>this.check('A')}  />
                 <Button title = {this.state.CurrentSet.B} onPress = {()=>this.check('B')}  />
                 <Button title = {this.state.CurrentSet.C} onPress = {()=>this.check('C')}  />
                 <Button title = {this.state.CurrentSet.D} onPress = {()=>this.check('D')}  />
                 <Button title = "Go to Home" onPress = {()=>navigate('Home')}  />


                 <Button title = "Use a Lifeline" onPress = {()=>navigate('Lifeline')}  />
            </View>
        )
    }


    check(value){
        let result = false;
        if(value === this.state.CurrentSet.ans){
            //right answer give hime next answer
            // dont call setState as it will navigate back
            this.state.i++;
            result = true;
        }
       
  
        this.setState({resultVisibility:true});
        setTimeout(()=> {
            this.setState({resultVisibility:false});
              }
            ,2000)
    }
}