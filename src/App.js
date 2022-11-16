import { onAuthStateChanged } from 'firebase/auth';
import {  useState } from 'react';
import './App.css';
import useFirebase from './context/useFirebase';
import Nav_bar from './pages/Nav_bar';
import Sign from './pages/Sign';


function App() {

  const {auth} = useFirebase();
  const [isSignedIn,setIsSignedIn] = useState(false)



    onAuthStateChanged(auth,(user) => {
      if(user){
        setIsSignedIn(true) 
      }
      else{
        setIsSignedIn(false)
      }
    })






  return (
    <>
      {isSignedIn ? <Nav_bar /> : <Sign /> }
    </>
  );
}

export default App;
