"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

import { db, auth } from "../server/firebase.js";

import jwt, { JwtPayload } from 'jsonwebtoken';
import Cookies from 'js-cookie';



export default function Home() {

  // console.log('INITIAL')
  const router = useRouter();

  let [authInfo, setAuthInfo] = useState({
    isloggedIn: false,
  });

  let [current, setCurrent] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState(null);

  let [userInfo, setUserInfo] = useState({
    firstName: 'GUSTAVO',
    lastName: '',
    email: '',
    UID: '',
    admin: false,
    analyses: {}
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // On component mount, check for the cookie
    checkCookie();
  }, []);
  
  let decodedToken: JwtPayload | null = null;
    // // // --- Cookies

  const checkCookie = () => {
    const userCookie = Cookies.get('gusvega_cookie');
    if (userCookie) {
      // Cookie exists, extract the value (JWT token)
      const token = userCookie;
      const decodedToken = jwt.decode(token);
      // console.log('Decoded Token:', decodedToken);

      // You can perform further actions with the token here if needed
      router.push("/home");

    } else {
      console.log('Cookie not found');
    }
  };


  const handleSignUpCookie = (token: string | JwtPayload | null) => {
    if (typeof token === 'string') {
      // token is a string, decode it
      const decodedToken = jwt.decode(token) as JwtPayload; // Use a type assertion (as)
  
      if (decodedToken && typeof decodedToken.exp === 'number') {
        // decodedToken.exp is a valid number, set the cookie expiration date
        Cookies.set('gusvega_cookie', token, {
          expires: new Date(decodedToken.exp * 1000),
        });
      } else {
        console.error('Invalid token or token expiration. Unable to set cookie.');
      }
    } else {
      console.error('Invalid token. Unable to set cookie.');
    }
  };

  const addDocument = async (token: string | JwtPayload | null) => {
    if (typeof token === 'string') {
      const decodedToken = jwt.decode(token) as JwtPayload; // Use a type assertion (as)
  
      if (decodedToken && typeof decodedToken.exp === 'number') {
        const usersCollectionRef = collection(db, "users");
        try {
          const documentRef = doc(usersCollectionRef, decodedToken.user_id);
          await setDoc(documentRef, { name: name, email: email, UID: decodedToken.user_id });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      } else {
        console.error('Invalid token or token expiration. Unable to add document.');
      }
    } else {
      console.error('Invalid token. Unable to add document.');
    }
  };
  

  const register = async (e ) => {
    // console.log(password, name, email)
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const userRes = res.user;
        // console.log('RES: ', userRes)
        userRes.getIdToken().then((token) => {
          // // console.log(token);
          // createCookie(token)
          handleSignUpCookie(token)
          addDocument(token)
        });

        // setData({
        //   ...data,                                // spreading the unchanged values
        //   email: email,          // changing the state of *changed value*
        // })

        router.push("/home");
      })
      .catch((err) => {
        // console.log(err.code)
        if (err.code === "auth/email-already-in-use") {
          // console.log('Email already in use')
          setError("Email already in use");
        }
      });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      // Check if the email/account exists before signing in
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      
      if (signInMethods.length === 0) {
        console.log('Account does not exist. Please sign up first.');
      } else {
        // Account exists, proceed with sign-in
        await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const userRes = res.user;
          // console.log('RES: ', userRes)
          userRes.getIdToken().then((token) => {
            handleSignUpCookie(token)
            console.log('Sign-in successful!');
            router.push("/home");
          });
          })
        .catch((err) => {
          // console.log(err.code)
          if (err.code === "auth/email-already-in-use") {
            // console.log('Email already in use')
            setError("Email already in use");
          }
        });


      }
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleClick = () => {
    
    setCurrent(!current);
  };

  return (
    <div className="text-white">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-black">
            Welcome to my Real Estate Analysis Tool!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex mb-6">
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md ${
                current == false ? "bg-gray-300" : "bg-indigo-600"
              } m-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              onClick={handleClick}
            >
              Sign In
            </button>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md ${
                current ? "bg-gray-300" : "bg-indigo-600"
              } m-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              onClick={handleClick}
            >
              Sign Up
            </button>
          </div>
          <form className="space-y-6" action="#" method="POST">
            {authInfo.isloggedIn ? (
              <>dd</>
            ) : current == true ? (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="text-black block text-sm font-medium leading-6 "
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-black block text-sm font-medium leading-6 "
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium leading-6 text-black">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>                
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}
          </form>

          {current ? (
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-indigo-600 mt-10 p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              onClick={handleSignIn}

            >
              Submit
            </button>
          ) : (
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-indigo-600 mt-10 p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              onClick={register}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      
    </div>
  );
}
