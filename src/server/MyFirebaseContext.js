// context/FirebaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, firestoreDB, getDoc, doc } from './firebase';
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";


const FirebaseContext = createContext();

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
    const [data, setData] = useState();

    const router = useRouter();

    useEffect(() => {
        // Fetch data from Firebase and update the state
        const fetchData = async () => {
          let decodedToken = '';
      
          const userCookie = Cookies.get("gusvega_cookie");

          if (userCookie) {
            // console.log('Before decoding token'); // Add this line
            const token = userCookie;
            decodedToken = jwt.decode(token);
            // console.log('decodedToken-----', decodedToken.user_id);
            // console.log('After decoding token'); // Add this line

      
            try {
              const collectionPath = "users";

      
              const documentRef = doc(collection(firestoreDB, collectionPath), decodedToken.user_id);
              const querySnapshot = await getDoc(documentRef);
      
              if (querySnapshot.exists()) {
                // console.log("Document data:", querySnapshot.data());
                setData(querySnapshot.data());
                // console.log("Context data:", querySnapshot.data());
              } else {
                console.log("Document does not exist");
              }
            } catch (error) {
              console.error('Error fetching data from Firebase: ', error);
            }
          } else {
            console.log("Cookie not found");
          }
        };
      
        fetchData();
      }, []);

    const updateData = (newData) => {
        setData(newData);
    };

    return (
        <FirebaseContext.Provider value={{ data, updateData }}>
            {children}
        </FirebaseContext.Provider>
    );
};
