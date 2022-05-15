import React, {useState, useRef, useEffect} from 'react';
import "./Login.css";
import { provider, firebase_auth} from '../../firebase';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useSelector, useDispatch } from 'react-redux';
import { setSignUpCredentials, selectUserAuthEmail, cleanSignUpCredentails, setSignIn, selectUserAuthErrorMsg , selectUserAuthPassword} from '../../features/authSlice';
import { selectUser} from '../../features/userSlice';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button } from '@material-ui/core';
import Alert from '../Alerts/Alert'
import {Link} from 'react-router-dom'
const Login = () => {
    const sign_up_password2_ref = useRef();
    const sign_up_email_ref = useRef();
    const sign_up_password_ref = useRef();
    const sign_in_email_ref = useRef();
    const sign_in_password_ref = useRef();
    const authDispatch = useDispatch();
    const [doneSignUp, setDoneSignUp]=useState(false);
    const [doneSignIn, setDoneSignIn] = useState(false);
    const [alertSignUp, setAlertSignUp] = useState(false);
    const [alertContent, setAlertContent] = useState();
    const [loadingButtonOff, setLoadingButtonOff]=useState(false);
    const [error, setError]=useState();
    //
    
    const authEmail = useSelector(selectUserAuthEmail);
    const authPassword = useSelector(selectUserAuthPassword);
  
    const eee=()=>{
        console.log(authPassword)
    }
     const signUp= (e)=>{
        e.preventDefault();
        if(sign_up_password2_ref.current.value == sign_up_password_ref.current.value){
            /*if(error){
                setAlertSignUp(true);
                setAlertContent("Faild to register user!")
                setTimeout(()=>{
                    setAlertSignUp(false);
                    setAlertContent("")
                }, 3000)
            }
            else{
                setDoneSignUp(!doneSignUp);
                setSignUP(!sign_up)
            }*/
            
            setDoneSignUp(!doneSignUp);
            //if(authMSG){
               
           // }
            //setSignUP(!sign_up)
           
        }
        else{
            setAlertSignUp(true);
            setAlertContent("Password doesn't match")
            setTimeout(()=>{
                setAlertSignUp(false);
                setAlertContent("")
            }, 3000)
            //alert(`Passowrd didn't match`)
        }
        
       
        //firebase_auth.createUserWithEmailAndPassword(sign_up_email_ref.current.value, sign_up_password_ref.current.value);
     }
     const signIn=(e)=>{
         
         e.preventDefault();
         setDoneSignIn(!doneSignIn);
         //firebase_auth.signInWithEmailAndPassword(sign_in_email_ref.current.value , sign_in_password_ref.current.value)

     }
     useEffect(() => {
        const a = firebase_auth.onAuthStateChanged(() =>{   //async
           
                if(doneSignUp == true){
                    setLoadingButtonOff(true);
                    authDispatch(  setSignUpCredentials({ //await
               
                      user_auth_email: sign_up_email_ref.current.value,
                      user_auth_password: sign_up_password_ref.current.value
                
                  }))
                 
                  cleanSignUpCredentails();
                }
              
              
            
                  
               
                setLoadingButtonOff(false)
                
            
            
          
        })
        
        return a;
    }, [doneSignUp])
    useEffect(() => {
        const b = firebase_auth.onAuthStateChanged(()=>{
            //try{
                if(doneSignIn == true){
                authDispatch(setSignIn({
                    user_auth_email: sign_in_email_ref.current.value,
                    user_auth_password: sign_in_password_ref.current.value
                }))
                cleanSignUpCredentails();
            }
              
            //}
           // catch{
                //console.log(err)
                
          //  }
        })
        return b;
    }, [doneSignIn])
    
    const logInViaGoogle = (e) =>{
        e.preventDefault();
        firebase_auth.signInWithPopup(provider).catch((error)=>console.log(error));
        
    }
    let [sign_up, setSignUP] = useState(false);

    const isSetUp = ()=>{
        setSignUP(!sign_up)
    }
   

   
    return (
        <div className="login">
            <div className='login_field'>
            
            <div className="login_main">
                <div className="overlay"style={{animation: sign_up ? 'slideright 1s linear forwards':'slideleft 1s linear forwards'}}>
                <div className="sign_in" >
                    <div className="sign_in_content">
                    <h1>Welcome back!</h1>
                    <p>It's nice to see you again</p>
                    <button onClick = {isSetUp}>SIGN UP</button>
                    </div>
                </div>
                <div className="sign_up">
                <div className="sign_up_content">
                    <h1>Hi there!</h1>
                    <p>Create account and make your company thrive </p>
                    <button onClick = {isSetUp}>SIGN IN</button>
                    </div>
                </div>
                </div>
            <form onSubmit={signIn}>
            <h1> Sign in!</h1>
                <input placeholder="Email" type="mail" ref={sign_in_email_ref} required></input>
                <input placeholder="Password" type="password" ref={sign_in_password_ref} required></input>
                <div className="socials_login">
                <p>or use your socials</p>
                <Button  onClick={logInViaGoogle}><PlayForWorkIcon></PlayForWorkIcon></Button>
                </div>
                <button type="submit">SIGN IN</button>
                <div className='password-forgot'>
                    <h4>Forgot your password?</h4>
                    <Link to='/password_forgot'>Click Here</Link>
                </div>
            </form>
            <form  onSubmit={ signUp}> 
            <h1> Sign up!</h1>
            {alertSignUp? <h3 className='sign-up-alert'>{alertContent}</h3>:null}
                <input placeholder="Email" type="mail" ref={sign_up_email_ref} required></input>
                <input placeholder="Password" type="password" ref={sign_up_password_ref} required></input>
                <input placeholder="Confirm Password" type="password" ref={sign_up_password2_ref} required></input>
                <button type="submit" disabled={loadingButtonOff}>SIGN UP</button>
            </form>
            </div>

            </div>
            <div className="bbls">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                
            </div>
        </div>
    )
}

export default Login