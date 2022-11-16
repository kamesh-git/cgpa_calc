import { initializeApp } from "firebase/app";
import { getAuth  } from 'firebase/auth'

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBhJMGhasR6IBdD6nDC8hjgxjdvGOBox1M",
    authDomain: "cofee-shop-86518.firebaseapp.com",
    projectId: "cofee-shop-86518",
    storageBucket: "cofee-shop-86518.appspot.com",
    messagingSenderId: "430175212823",
    appId: "1:430175212823:web:2f2dd08054dd1c4bcfd352",
    measurementId: "G-CSB4PEW6QC"
  };
    
    
    // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app)


    return { app,auth };
}
export default useFirebase