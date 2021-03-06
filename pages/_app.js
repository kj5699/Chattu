import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth'
import { db , auth} from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import firebase from 'firebase'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);
  
  useEffect(() => {
    if(user) {
      
      db.collection("users").doc(user.uid).set(
      {
        name:user.displayName,
        email:user.email,
        lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL
      },{merge: true}
      )}

  }, [user])
  
  
  if (!user) {return <Login />}
  if(loading){return <Loading />
  
  }

  return <Component {...pageProps} />
}

export default MyApp
