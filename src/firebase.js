import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, push, update, remove } from 'firebase/database';
import { useEffect, useState } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyC-GZHRx2kkBDY-eVJAPSKr6lJ0XW-8FTw",
  authDomain: "chorewheel-gold.firebaseapp.com",
  databaseURL: "https://chorewheel-gold-default-rtdb.firebaseio.com",
  projectId: "chorewheel-gold",
  storageBucket: "chorewheel-gold.appspot.com",
  messagingSenderId: "921593314891",
  appId: "1:921593314891:web:88633bdf1bfc1c380417ce",
  measurementId: "G-Q807LY7X13"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();


  useEffect (() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const getRefByPush = (path) => (
  push(ref(database, path))
)

export const updateData = (childRef, value) => (
  update(childRef, value)
)

export const updateDataByPath = (path, value)=> (
  update(ref(database, path), value)
);

export const deleteData = (path) => (
  remove(ref(database, path))
);