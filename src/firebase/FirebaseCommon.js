import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
if(process.env.REACT_APP_PROFILE === 'dev') connectFirestoreEmulator(firestore, "localhost", 8080);

const auth = getAuth(app);
if(process.env.REACT_APP_PROFILE === 'dev') connectAuthEmulator(auth, "http://127.0.0.1:9099");

const functions = getFunctions(app);
if(process.env.REACT_APP_PROFILE === 'dev') connectFunctionsEmulator(functions, "localhost", 5002);

export { auth, firestore, functions };
