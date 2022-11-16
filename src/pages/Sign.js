import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Container, Form, Button, Image } from 'react-bootstrap'
import useFirebase from '../context/useFirebase'
import '../styles/Sign.css'
import img from '../assets/Google.webp'



const Sign = () => {
  const { auth } = useFirebase();
  const [logSign, setLogSign] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const provider = new GoogleAuthProvider();


  const googleauth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
  }

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
  }





  return (
    <>
      {logSign ?
        <Container className='container_sign'>
          <Form onSubmit={() => login()}>
            <h1>Log in</h1>
            <Form.Group className="mb-3 form" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Image onClick={() => googleauth()} style={{ marginLeft: 10, cursor: 'pointer' }} width={40} height={40} src={img} />
            <p onClick={() => setLogSign(false)} className='redirect'>Not an user? <b>Sign up</b></p>
          </Form>
        </Container>
        :
        <Container className='container_sign'>
          <Form onSubmit={() => signup()}>
            <h1>Sign up</h1>
            <Form.Group className="mb-3 form" controlId="">
              <Form.Label>Name</Form.Label>
              <Form.Control value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter Name" required />
            </Form.Group>
            <Form.Group className="mb-3 form" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p onClick={() => setLogSign(true)} className='redirect'>Already an user! <b>Log in</b></p>
          </Form>
        </Container>}
    </>
  )
}

export default Sign