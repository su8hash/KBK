import {  StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  
  gameContainer:{
    flex:1,
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#bfc3c9'
  },

  ansContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
  },

  questionConatainer:{
   padding:0,
   justifyContent:'flex-start'
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
currentScore:{
alignItems:'flex-start',
marginBottom:10,
flexDirection:'row'
},
topHeader:{
  flexDirection:'row',
 justifyContent:'space-between'
},

imageText:{
alignItems:'center',
marginBottom:5,
flexDirection:'column',
},

 questionText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#333333',
    fontWeight  : 'bold',
  },





 

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerSpace: {
    flex: .5,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'red',
    flexDirection:'row'
  },
   containerGame: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#bfc3c9',
    flexDirection:'column'
  },
  containerGameRight: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
   
    flexDirection:'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
   bigText: {
    fontSize: 25,
    textAlign: 'left',
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