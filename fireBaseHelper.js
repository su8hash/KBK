import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAIuNQRTg3HQieLofZaW_4iHJUSfwZvx60",
    authDomain: "kbkdata-719b8.firebaseapp.com",
    databaseURL: "https://kbkdata-719b8.firebaseio.com",
    projectId: "kbkdata-719b8",
    storageBucket: "kbkdata-719b8.appspot.com",
};
  firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.database().ref();