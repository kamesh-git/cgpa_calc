import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import useFirebase from '../context/useFirebase'
import Calculator from './Calculator';

const Nav_bar = () => {

  const {auth} = useFirebase();


  return (
    <>
    <div style={{display:'flex',justifyContent:'flex-end'}}><Button style={{marginRight:0}} onClick={() => signOut(auth)} variant='danger'>Signout</Button></div>
        <Container className='calculator'>
            <h1>CGPA calculator app</h1>
            <Calculator />
        </Container>

    </>
  )
}

export default Nav_bar