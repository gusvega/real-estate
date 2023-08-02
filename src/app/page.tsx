"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

import { db, auth } from "../server/firebase.js";

import jwt from 'jsonwebtoken';
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
  
  let decodedToken = ''
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


  const handleSignUpCookie = (token: string) => {
    decodedToken = jwt.decode(token); // Decode the JWT token

    // Set the 'user_cookie' with the token and the expiration date
    Cookies.set('gusvega_cookie', token, {
      expires: new Date(decodedToken.exp * 1000),
    });
  };

  const addDocument = async () => {
    const usersCollectionRef = collection(db, "users");
    // console.log('decodedToken', decodedToken)

    try {
      const documentRef = doc(usersCollectionRef, decodedToken.user_id);
      await setDoc(documentRef, {name: name, email: email, UID: decodedToken.user_id});
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const register = async (e: string ) => {
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
          addDocument()
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
