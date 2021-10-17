import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, push, update, remove } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCvsKdL8xPuCvNJpYNAPbpFRBb9yPnsFOI",
  authDomain: "chorewheelv2.firebaseapp.com",
  databaseURL: "https://chorewheelv2-default-rtdb.firebaseio.com",
  projectId: "chorewheelv2",
  storageBucket: "chorewheelv2.appspot.com",
  messagingSenderId: "378499330161",
  appId: "1:378499330161:web:5123dc86f365fbae2febd0",
  measurementId: "G-P5VQ22NQRM"
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