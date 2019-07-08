
import * as firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyBYHO4legAQsFav2XhWSWBCCf2PIWdMFvY",
    authDomain: "facebook-cabd6.firebaseapp.com",
    databaseURL: "https://facebook-cabd6.firebaseio.com",
    projectId: "facebook-cabd6",
    storageBucket: "facebook-cabd6.appspot.com",
    messagingSenderId: "256313933126",
    appId: "1:256313933126:web:afcb11cfdf9edf32"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var Gprovider = new firebase.auth.GoogleAuthProvider();
   
  export {
      Gprovider,
          firebase,

      }