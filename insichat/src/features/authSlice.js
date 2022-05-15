import React, {useEffect, useState} from 'react';
import { createSlice } from '@reduxjs/toolkit'
import { firebase_auth } from '../firebase';


const authSlice = createSlice({
    name: 'auth',
    initialState:  {

        user_auth_email: null,
        user_auth_password: null,
       // user_auth_error_msg: null
       
        
    },
    reducers: {
        setSignUpCredentials: (state, action)=>{
            //return firebase_auth.createUserWithEmailAndPassword(email, password)
            let error;
            state.user_auth_email = action.payload.user_auth_email;
            state.user_auth_password = action.payload.user_auth_password;
            

           
                firebase_auth.createUserWithEmailAndPassword(state.user_auth_email, state.user_auth_password).catch((err)=>{
               
                
                    alert(err)
                });  
            
           
            
            //state.auth.user_auth_error_msg=error;
        },
        cleanSignUpCredentails: (state) =>{
            state.user_auth_email= null;
            state.user_auth_password= null;
          
        },
        setSignIn: (state, action)=> {
         
            state.user_auth_email = action.payload.user_auth_email;
            state.user_auth_password = action.payload.user_auth_password;
           
            firebase_auth.signInWithEmailAndPassword(state.user_auth_email, state.user_auth_password).catch((err)=>{
                
               alert(err)
            })
        
        }
        
    },
});
/*useEffect(() => {
    const a = firebase_auth.onAuthStateChanged(xUser=>{
         state.user = xUser
     })
 
     return a;
 }, [])*/
export const {setSignUpCredentials, cleanSignUpCredentails, setSignIn} = authSlice.actions;


export const selectUserAuthName= state=> state.auth.user_name;
export const selectUserAuthEmail= state=>state.auth.user_email;
export const selectUserAuthPassword= state=>state.auth.user_password;
export const selectUserAuthErrorMsg= state=>state.auth.user_auth_error_msg;
export default authSlice.reducer