import firebase, { database } from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAwDSw7513xvx5D2YOvWeHqeIfNBIIpcE0",
    authDomain: "calorie-sentinel.firebaseapp.com",
    databaseURL: "https://calorie-sentinel.firebaseio.com",
    projectId: "calorie-sentinel",
    storageBucket: "calorie-sentinel.appspot.com",
    messagingSenderId: "287675177189"
};

const fire = firebase.initializeApp(config);
export default fire;