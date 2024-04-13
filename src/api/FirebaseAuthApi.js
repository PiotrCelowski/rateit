import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  browserSessionPersistence,
  updateProfile,
  deleteUser
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
  await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
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

export const deleteCurrentUser = async () => {
  try {
    const currentUser = getCurrentUser()
    await deleteUser(currentUser)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const isUserAdmin = (tokenResult) => {
  if (tokenResult.claims["role"] != null) {
    return tokenResult.claims["role"] === "admin";
  } else {
    return false;
  }
};

export const updatePhoto = async (imageUrl) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: imageUrl
    })
  } catch (error) {
    throw error
  }
}
