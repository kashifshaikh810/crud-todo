import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBRwt5CTmdMOcL7Df29PMX8xhcpXaMSpVA",
  authDomain: "todo-app-89f59.firebaseapp.com",
  databaseURL:
    "https://todo-app-89f59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-app-89f59",
  storageBucket: "todo-app-89f59.appspot.com",
  messagingSenderId: "414956210401",
  appId: "1:414956210401:web:eb85a74055d0827a9ccfa0",
  measurementId: "G-0F15F0LQS8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
