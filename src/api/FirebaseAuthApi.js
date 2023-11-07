import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../configuration/firebase/FirebaseCommon";

export const signInWithEmail = async (email, password, rememberMe) => {
  if (!rememberMe) {
    await auth.setPersistence(browserSessionPersistence);
  }
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredentials;
};

export const signUpWithEmail = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  var provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const signInWithFacebook = async () => {
  var provider = new FacebookAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const isUserSignedIn = () => {
  return !!auth.currentUser;
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const isUserAdmin = (tokenResult) => {
  if (tokenResult.claims["role"] != null) {
    return tokenResult.claims["role"] === "admin";
  } else {
    return false;
  }
};
