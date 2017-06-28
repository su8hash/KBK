import {  StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    fontSize: 25,
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
    fontSize: 15,
    color:'#FFFFFF',
  },

   ansContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    margin:10
  },
});