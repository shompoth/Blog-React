import firebase from "firebase/app";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyBBimHaidh8C50VxCNBpQz7Fb5ps2PPx3M",
  authDomain: "blog-react-c3132.firebaseapp.com",
  databaseURL:
    "https://blog-react-c3132-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blog-react-c3132",
  storageBucket: "blog-react-c3132.appspot.com",
  messagingSenderId: "588904433907",
  appId: "1:588904433907:web:96561163b5b166d82c4f86",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
