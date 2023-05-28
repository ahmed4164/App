// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCOcB3pawdRLeGtM-7HJTApkQ99S_dNll4',
  authDomain: 'mynotes-d37f8.firebaseapp.com',
  projectId: 'mynotes-d37f8',
  storageBucket: 'mynotes-d37f8.appspot.com',
  messagingSenderId: '1085849962093',
  appId: '1:1085849962093:web:7e4d93539e23cc47efa164',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
