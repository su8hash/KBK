import {  StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  
  gameContainer:{
    flex:1,
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#bfc3c9'

  },

   instructionContainer:{
    flex:1,
    padding:10,
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  topScore:{
    
  padding:20,
  },
  buttonStyle:{
    width:250,
    height :35,
    borderRadius:19,
    backgroundColor: '#33AAFF',
    margin:10,
    justifyContent:'center',
    alignItems:'center',
  },
  topScoreList:{
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  scoreContainer:{
  width:80,
  textAlign: 'left',
  color: '#333333',
  fontWeight: 'bold',
  },
 

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerSpace: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    flexDirection:'row'
  },
   containerGame: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    flexDirection:'column'
  },
  containerGameRight: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
    flexDirection:'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
   bigText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    backgroundColor: '#33AAFF',
    borderWidth:10,
    borderRadius:20,
    borderColor:'#33AAFF',
    padding:5,
    margin:5,
  },
   buttonText:{
    fontSize: 12,
    color:'#FFFFFF',
  },

   ansContainer:{
    margin:1
  },
  
    list: {
        flex: 1,
        flexDirection: 'row'
    },
    listContent: {
        flex: 1,
        flexDirection: 'column'
    },
    row: {
        flex: 1,
        padding: 42,
        borderWidth: 1,
        fontSize: 24,
        borderColor: '#DDDDDD'
    },
});