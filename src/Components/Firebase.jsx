import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCwJENAuUC1soFQlqxzS77BC7Do_8kwxhQ",
  authDomain: "otp-app-37a40.firebaseapp.com",
  projectId: "otp-app-37a40",
  storageBucket: "otp-app-37a40.appspot.com",
  messagingSenderId: "853501168536",
  appId: "1:853501168536:web:dcf48a68a2e14a563179ed"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export default firebase

