'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc
} from "firebase/firestore";
import { db, auth } from "../server/firebase.js";

interface AuthInfo {
  isloggedIn: boolean;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  UID: string;
  admin: boolean;
  analyses: Record<string, any>;
}

export default function Home() {
  const router = useRouter();

  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isloggedIn: false,
  });

  const [current, setCurrent] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'GUSTAVO',
    lastName: '',
    email: '',
    UID: '',
    admin: false,
    analyses: {}
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // On component mount, check for the cookie
    checkCookie();
  }, []);

  const checkCookie = () => {
    const userCookie = Cookies.get('gusvega_cookie');
    if (userCookie) {
      const token = userCookie;
      const decodedToken = jwt.decode(token);
      router.push("/home");
    } else {
      console.log('Cookie not found');
    }
  };

  const handleSignUpCookie = (token: string) => {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    Cookies.set('gusvega_cookie', token, {
      expires: new Date(decodedToken.exp! * 1000),
    });
  };

  const addDocument = async (token: string) => {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    const usersCollectionRef = collection(db, "users");
    try {
      const documentRef = doc(usersCollectionRef, decodedToken.user_id);
      await setDoc(documentRef, { name: name, email: email, UID: decodedToken.user_id });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const userRes = res.user;
        userRes.getIdToken().then((token) => {
          handleSignUpCookie(token);
          addDocument(token);
        });
        router.push("/home");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("Email already in use");
        }
      });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        console.log('Account does not exist. Please sign up first.');
      } else {
        await signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            const userRes = res.user;
            userRes.getIdToken().then((token) => {
              handleSignUpCookie(token);
              console.log('Sign-in successful!');
              router.push("/home");
            });
          })
          .catch((err) => {
            if (err.code === "auth/email-already-in-use") {
              setError("Email already in use");
            }
          });
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleClick = () => {
    setCurrent((prev) => !prev);
  };

  return (
    <div className="text-white">
      {/* ... (JSX code) */}
    </div>
  );
}
