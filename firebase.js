import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDhLf9YRdJ1HForv9lLLhiN4_hXv-5DAd8",
    authDomain: "chattu-53af5.firebaseapp.com",
    projectId: "chattu-53af5",
    storageBucket: "chattu-53af5.appspot.com",
    messagingSenderId: "273296963192",
    appId: "1:273296963192:web:c32e5e11aec607f00adf8d"
  };
let app;
if (!firebase.apps.length) {
     app =firebase.initializeApp(firebaseConfig);
 }else {
     app = firebase.app(); // if already initialized, use that one
 }
            

const db= app.firestore()

const auth =app.auth()
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider};

