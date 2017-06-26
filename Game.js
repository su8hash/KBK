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
import Data from './data.json'


export default class Game extends Component{

constructor(){
    super();
    this.state = {a: 1,instructionVisible:true};
    this.instuctionDone = this.instuctionDone.bind(this);
}

componentWillMount(){
 console.warn(Data.q1[0].que);
}


componentDidMount(){
     BackHandler.addEventListener('backPress', () => {
        console.warn("It's Here");
        this.setState({a:++this.state.a});
        return true;
   }); 
}

componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
  }


  instuctionDone(){
      this.setState({instructionVisible:false})
  }

    render(){

        const {navigate} = this.props.navigation ;

        return(
            <View>
     

             <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.instructionVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
           <UserPrompt instuctionDone = {this.instuctionDone}/>
          </Modal>

                <Text>
                   Game + {this.state.a}
                </Text>
                 <Button title = "Go to Home" onPress = {()=>navigate('Home')}  />
            </View>
        )
    }
}