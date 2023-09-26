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

    let newData = ''

    
    
    const fetchDataFromFirebase = async () => {
        let decodedToken = '';
        const userCookie = Cookies.get("gusvega_cookie");
    
        if (userCookie) {
            const token = userCookie;
            decodedToken = jwt.decode(token);
    
            try {
                const collectionPath = "users";
                const documentRef = doc(collection(firestoreDB, collectionPath), decodedToken.user_id);
                const querySnapshot = await getDoc(documentRef);
    
                if (querySnapshot.exists()) {
                    setData(querySnapshot.data());
                    newData = data
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

    useEffect(() => {
        fetchDataFromFirebase();
        
    }, []);

    const updateData = (newData) => {
        setData(newData);
    };

    return (
        <FirebaseContext.Provider value={{ data, updateData, fetchDataFromFirebase }}>
            {children}
        </FirebaseContext.Provider>
    );
};
