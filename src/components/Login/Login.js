import React, { useContext, useState } from 'react';
import './login.css'
import firebase from "firebase/app";
import "firebase/auth";
import {MyContext} from '../../App'
import { firebaseConfig } from '../firebase.config/firebase.config';
import { useHistory, useLocation } from 'react-router';
import { handleFb, handleGoggle, handleSignIn, handleSignOut, signUpEvent } from './LoginManager';


if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
}
 

const Login = () => {
    const [loggedUser,setLoggedUser] = useContext(MyContext)
    const history = useHistory()
    const location = useLocation()
    const {from} = location.state || {from:{pathname:'/'}}
const [user,setUser] = useState({
    name:'',
    email:'',
    password:'',
    signUp:true,
    isValid:true
})
//switching sign up and login


const signUp=()=>{
    const newUser={...user}
     newUser.signUp= newUser.signUp?false:true;
      setUser(newUser)
}
// set data
const response=(newUser)=>{
    setUser(newUser)
    setLoggedUser(newUser)
    history.replace(from)
}

const googleSignIn=()=>{
 handleGoggle()
 .then(newUser=>{
 setLoggedUser(newUser)
 setUser(newUser);
storeToken()
 })
}
const storeToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
        sessionStorage.setItem('token',idToken);
        history.replace(from)
      }).catch(function(error) {
        // Handle error
      });
}

const fbSignIn=()=>{
    handleFb()
    .then(newUser=>{
        response(newUser)
       })
       
        
    
}
const handleChange=(e)=>{
    const newUser = {...user}
    if( e.target.name === 'password'){
        newUser.isValid = /\d/.test(e.target.value)? true:false
    }
    if( e.target.name === 'email'){
        newUser.isValid = /(.+)@(.+){2,}\.(.+){2,}/.test(e.target.value)? true:false
    }
    if (newUser.isValid){ newUser[e.target.name] = e.target.value}
    setUser(newUser)
    
}
const handleSignUp=(e)=>{
  signUpEvent(user)
  .then(newUser=>{
      response(newUser)
  })
  e.preventDefault();
    e.target.reset();
}
const SignIn=(e)=>{
    handleSignIn(user)
    .then(res=>{
        response(res)
    })
    e.preventDefault();
    e.target.reset()
}
// log out 
const logOut=() =>{
  const newUser = handleSignOut()
    setUser(newUser)
    setLoggedUser(newUser)
}


    return (
       
    <div className='login_container text-center'>
    <h1>Welcome  {loggedUser.email}</h1>
    <button className="btn bg" onClick={logOut}>Log Out</button>
     <button className="btn bg" onClick={signUp}>{user.signUp?'sign up':'login'}</button>
     {user.signUp &&<form action="" className='login_form' onSubmit={handleSignUp}>
     <input type="text" onBlur={handleChange} placeholder='Name' name='name' className='form-control mt-2'/>
     <input type="text" onBlur={handleChange} placeholder='Email' name='email' className='form-control mt-2'/>
     <input type="password" onBlur={handleChange} placeholder='Password' name='password' className='form-control mt-2'/>
     <input type="submit" value='Sing up' className='btn btn-primary mt-4'/>
    </form>
     } 
     { !user.signUp && 
     <form action="" className='login_form' onSubmit={SignIn}>
     <input type="text"  placeholder='Email' onBlur={handleChange} name='email' className='form-control mt-2'/>
     <input type="password"  placeholder='Password' onBlur={handleChange} name='password' className='form-control mt-2'/>
     <input type="submit" name="signIn" value="login" className='btn btn-primary mt-4'/>
       </form>}
    <br/>
      <button className="btn btn-success" onClick={fbSignIn}>Login with Facebook</button><br/><br/>
      <button className="btn btn-warning" onClick={googleSignIn}>Login with Google</button>
        </div>
    );
};

export default Login;