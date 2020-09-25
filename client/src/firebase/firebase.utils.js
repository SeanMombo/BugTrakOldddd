import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
require("firebase/functions");

const config = {
    apiKey: "AIzaSyC7J1Jfu8DnMaKYK7XZmwymosz5w5xpluM",
    authDomain: "bugtrak-ff53f.firebaseapp.com",
    databaseURL: "https://bugtrak-ff53f.firebaseio.com",
    projectId: "bugtrak-ff53f",
    storageBucket: "bugtrak-ff53f.appspot.com",
    messagingSenderId: "829003961471",
    appId: "1:829003961471:web:708f796070d53e1a49db4a",
    measurementId: "G-TFB7THVC8J"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //checks if null
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const convertUsersToMap = (users) => {
    const transformedCollection = users.docs.map(doc => {
        const { displayName, userType, email } = doc.data();

        return {

            id: doc.id,
            displayName,
            userType,
            email,
        }
    })

    
    let acc = transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.displayName.toLowerCase()] = collection;
        return accumulator;
    }, {});

    const ordered = {};
    Object.keys(acc).sort().forEach(function(key) {
      ordered[key] = acc[key];
    });

    return ordered; 
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ promt:"select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;