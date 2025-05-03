import { initializeApp, getApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD31cMixNknW3GaNiqUiIVU_rM77RJnYSo",
  authDomain: "mockprep-1a10e.firebaseapp.com",
  projectId: "mockprep-1a10e",
  storageBucket: "mockprep-1a10e.firebasestorage.app",
  messagingSenderId: "733626150350",
  appId: "1:733626150350:web:e87b8a2a87cb601ac10f9f",
  measurementId: "G-KHJVKEBDQD"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);