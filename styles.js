import {  StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerSpace: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection:'row'
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