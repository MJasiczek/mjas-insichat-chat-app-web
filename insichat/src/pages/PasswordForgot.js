
import React, {useState, useRef, useEffect} from 'react';
import passwordForgotCSS from './PasswordForgot.module.css'
import { provider, firebase_auth} from '../firebase';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useSelector, useDispatch } from 'react-redux';
import { setSignUpCredentials, selectUserAuthEmail, cleanSignUpCredentails, setSignIn } from '../features/applSlice';
import { selectUser} from '../features/userSlice';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button } from '@material-ui/core';
import { Backdrop } from '../components/Alerts/ResetPasswordScene/Backdrop';
import { Modal } from '../components/Alerts/ResetPasswordScene/Modal';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router';
export const PasswordForgot = () => {
    const email_reset_ref = useRef();
    const [dropResetpasswordScene, setResetPasswordScene] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [content, setContnet] = useState(null)
    const [helper, setHelper] = useState(false);
    const resetPassword=(e)=>{
        e.preventDefault();
        ResetPasswordSceneDropHandler();
        try{
            firebase_auth.sendPasswordResetEmail(email_reset_ref.current.value);
            setRedirect(true)
            if(redirect){
                setContnet( <Redirect to='/login'/>)
               setRedirect(false);
           }else{
               setContnet(null)
           }
            
        }
        catch(err){
            console.log(err)
        }
        }
        /*useEffect(() => {
            const a= function(){
            if(redirect){
                setContnet( <Redirect to='/login'/>)
               setRedirect(false);
           }else{
               setContnet(null)
           }}
            return  a
        }, [helper])
       const RedirectFun=(boolValue)=>{
           setRedirect(boolValue)
           setHelper(!helper)
       }*/
    const ResetPasswordSceneDropHandler = ()=>{
        setResetPasswordScene(!dropResetpasswordScene);
    }
    const backdropResetPasswordSceneDropHandler = ()=>{
        setResetPasswordScene(false);
    }
    return (
        <div className={passwordForgotCSS.login}>
            {dropResetpasswordScene?
            <Backdrop closeBackdrop={backdropResetPasswordSceneDropHandler} /*RedirectFun = {RedirectFun}*//>:null}
             {dropResetpasswordScene?
            <Modal closeBackdrop={backdropResetPasswordSceneDropHandler} /*RedirectFun = {RedirectFun}*//>:null}
            { content}
            <div className={passwordForgotCSS.login_field}>
            
            <div className={passwordForgotCSS.login_main}>
               
                
                <div className="forgot_password_content">
                  
            <form className={passwordForgotCSS.form_forgot_password} onSubmit={resetPassword}>
            <h1> Reset Password</h1>
                <input placeholder="Email" type="mail" ref={email_reset_ref} required ></input>
               
                
                <button type="submit">Reset Password</button>
                <div className='password-forgot'>
                    <h4>Back to login page</h4>
                    <Link to='/login'>Click</Link>
                </div>
            </form>
           </div>
           </div>
           </div>
           </div>
          
           
           
            
    )
}
