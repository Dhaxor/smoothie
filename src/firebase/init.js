import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDECaki_DXU8bbzctZzB_6uH-ES3tXI2Og",
  authDomain: "smoothies-90ab0.firebaseapp.com",
  databaseURL: "https://smoothies-90ab0.firebaseio.com",
  projectId: "smoothies-90ab0",
  storageBucket: "smoothies-90ab0.appspot.com",
  messagingSenderId: "94652198446",
  appId: "1:94652198446:web:1f82ea7c80dd26a63b79bf",
  measurementId: "G-YKTBEQF5J2"
};
    //Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore() 
  //firebase.analytics();