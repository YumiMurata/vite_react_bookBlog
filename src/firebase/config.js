import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';  //adicionado a string copiada


const firebaseConfig = {
  apiKey: "AIzaSyAx92MQLbhKhQTGmmilb0gZHp5HO0ZQev8",
  authDomain: "firstblog-57038.firebaseapp.com",
  projectId: "firstblog-57038",
  storageBucket: "firstblog-57038.firebasestorage.app",
  messagingSenderId: "983080249254",
  appId: "1:983080249254:web:e0b54516cb50bbbc2ed167"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)  //adicionado a string copiada
export {db, app} //adicionado a string copiada