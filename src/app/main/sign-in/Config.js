
// import { initializeApp } from "firebase/app";
// import{getAuth,GoogleAuthProvider} from"firebase/auth"


// const firebaseConfig = {
//   apiKey: "AIzaSyDzztzdxVBwfilUItf03MUM7SJMejETx3M",
//   authDomain: "navagraha-da6cd.firebaseapp.com",
//   projectId: "navagraha-da6cd",
//   storageBucket: "navagraha-da6cd.appspot.com",
//   messagingSenderId: "887176425633",
//   appId: "1:887176425633:web:1855eefcb87e74c788c0e0",
//   measurementId: "G-KH6QS0NVL8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();


// export{auth,provider};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABDYnN2zV_jMv3pRUMJqN2UJ06HfTNBdA",
  authDomain: "navagraha-c59f7.firebaseapp.com",
  projectId: "navagraha-c59f7",
  storageBucket: "navagraha-c59f7.appspot.com",
  messagingSenderId: "81678216317",
  appId: "1:81678216317:web:d1e91e8e6a3dd195e91514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export{auth,provider};