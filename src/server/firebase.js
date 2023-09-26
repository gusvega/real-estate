import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { getDatabase } from "firebase/database";
import {
    getAuth, createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app);
const firestoreDB = getFirestore(app)

export { db, firestoreDB, collection, setDoc, doc, getDoc, auth, fetchSignInMethodsForEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword };
