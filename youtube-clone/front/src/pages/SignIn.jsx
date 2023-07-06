import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import {auth,provider} from "../firebase";
import {signInWithPopup} from "firebase/auth"


const Container = styled.div`
    
    height:calc(100vh - 56px) ;
    display: flex;
  
    justify-content: center;
    align-items: center;
    
`
const Wrapper = styled.div`
    border: 2px solid black;
    height:40% ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px;
    gap: 20px;
`
const Sign = styled.h1`
    
`
const Input = styled.input`
    padding: 5px;

`

const Button = styled.button`
background-color: black;
border: none;
padding: 5px;
color: white;
width: 90px;
cursor: pointer;
`
const Span = styled.span``

const SignIn = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch()

  const handleSignUp= async(e)=>{
    e.preventDefault();
   
    
    try
    {const res = await axios.post("/auth/signup", {name:name,email:email,password:password});
    console.log(res)
   
    }
    catch(err){
    
      console.log("Failed to sign up")
    }
  }
  const handleSignIn= async(e)=>{
    e.preventDefault();
     dispatch(loginStart());
    try
    {const res = await axios.post("/auth/signin", {name:name,password:password});
    dispatch(loginSuccess(res.data));
    console.log(res);}
    catch(err){
      dispatch(loginFailure());
      console.log("Failed to sign in")
    }
  }

const signInWithGoogle =async ()=>{
  dispatch(loginStart())
  signInWithPopup(auth,provider).then((result)=>{
  const res = axios.post("/auth/google",{
    name:result.user.displayName,
    email:result.user.email,
    photoURL:result.user.photoURL,
   
 
   }).then((res)=>{
    dispatch(loginSuccess(res.data))
   })
  }).catch((error)=>{
    dispatch(loginFailure())
    console.log(error)
  })
}

  return (
    <Container>
      <Wrapper>
    <Sign>
        SignIn
    </Sign>
    <Input placeholder="username" onChange={(e)=>{setName(e.target.value)}}></Input>
    <Input placeholder="password"onChange={(e)=>{setPassword(e.target.value)}}></Input>
    <Button type='submit' onClick={handleSignIn}>
        Sign In
    </Button>
    <Span>OR</Span>
    <Button onClick={signInWithGoogle}>Sign In with Google</Button>
    <Span>OR</Span>
    <Input placeholder="username" onChange={(e)=>{setName(e.target.value)}}></Input>
    <Input placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}></Input>
    <Input placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}></Input>
    <Button type='submit' onClick={handleSignUp}>
        Sign Up
    </Button>
      </Wrapper>
    </Container>
  )
}

export default SignIn
