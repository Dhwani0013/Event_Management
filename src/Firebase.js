import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAvDN-jC8fpvoPeVAZYKWtONKIRJwlXwTs",
    authDomain: "eventcraftersweb.firebaseapp.com",
    projectId: "eventcraftersweb",
    storageBucket: "eventcraftersweb.appspot.com",
    messagingSenderId: "284597734130",
    appId: "1:284597734130:web:53becb9d592aa4c25c9e6b"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();



export default firebase;
