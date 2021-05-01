import React, { useContext, useState } from 'react';
import {useForm} from 'react-hook-form';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: '',
        name: '',
        email: '',
        password: ''
    });


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const provider = new firebase.auth.GoogleAuthProvider();
    
    
    const handleSignIn = () => {
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName, email} = result.user;
    const signedInUser ={
        isSignedIn:true,
        name: displayName,
        email: email
    }
    setUser(signedInUser)
  }).catch((error) => {

  });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(() => {
            const signedOutUser ={
                isSignedIn:false,
                name: '',
                email: '',
                error: '',
                success: false
            }
            setUser(signedOutUser);
          }).catch((error) => {
            // An error happened.
          });
    }
   
    const { register, handleSubmit,errors } = useForm();

    const handleBlur = (e) => {
        let isFieldValid = true;
        
        if(e.target.name === 'name'){
        }
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber =  /\d{1}/.test(e.target.value);
            isFieldValid = (isPasswordValid && passwordHasNumber);
        }
        if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
        
    }
    const onSubmit = (e) => {
        // console.log(user.email, user.password);
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
             const newUserInfo = {...user};
             newUserInfo.error = '';
             newUserInfo.success = true;
             setUser(newUserInfo);
             updateUserName(user.name);
             console.log('signed in', res.user);
            })
            .catch((error) => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;  
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
        }

            if(!newUser &&  user.email, user.password){
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
    })
    .catch((error) => {
        const newUserInfo = {...user};
                newUserInfo.error = error.message;  
                newUserInfo.success = false;
                setUser(newUserInfo);
    });
            }

            // e.preventDefault();
        }

    const updateUserName = name =>{
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name,
        }).then(function() {
        console.log('updated');
        }).catch(function(error) {
        console.log('error');
        });
    }
    

    // console.log(watch("example")); // watch input value by passing the name of it
  
    return (
        <div className="login-info" >  
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}> 
       {newUser && <input  name="name" onBlur={handleBlur} placeholder='Enter your name' ref={register({ required: true })} />}
        {errors.name && <span className="error" >Name is required</span>}
        <input  name="email" onBlur={handleBlur} placeholder='Enter your email address' ref={register({ required: true })} />
        {errors.email && <span className="error" >Email is required</span>}
        <input name="password" onBlur={handleBlur} placeholder='Enter your password' ref={register({ required: true })} />
        {errors.password && <span className="error" >Password is required</span>}
        <input type="submit" className="btn btn-primary" value={newUser ? 'Sign up' : 'Sign in' } />
        <p style={{color: 'red'}} > {user.error} </p>
        {user.success && <p style={{color: 'green'}} > User {newUser ? 'Created' : 'Logged in'} Successfully </p>}
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser"> New User Sign up</label>
      </form>
        <div className="Social-Login" >
        <br/>
        {
            user.isSignedIn ? <button onClick={handleSignOut} type="button" className="btn btn-danger"> Sign out </button> :
            <button onClick={handleSignIn} type="button" className="btn btn-danger"> Sign in via Google Account </button>}
        
        
        <br/>
        <br/>
            
        {
            user.isSignedIn && <p> Welcome, {user.name} </p>
        }
      </div>
      </div>
    );
};

export default Login;