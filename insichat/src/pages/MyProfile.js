import { Avatar } from '@material-ui/core'
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';
import {update_email_user} from '../features/userSlice'
import {selectUserAuthEmail } from '../features/authSlice';
import {  firebase_auth} from '../firebase';
import {Backdrop} from '../components/Alerts/UpdateEmailProfile/Backdrop';
import {Modal} from '../components/Alerts/UpdateEmailProfile/Modal'
import {Backdrop2} from '../components/Alerts/UpdatePasswordProfile/Backdrop';
import {Modal2} from '../components/Alerts/UpdatePasswordProfile/Modal'
import React, {useState, useDispatch, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './MyProfile.css'
export const MyProfile = () => {
    const user = useSelector(selectUser);
    const authUs = useSelector(selectUserAuthEmail);
    const [dropUpdateProfileScene, setUpdateProfileScene]=useState(false);
    const [dropUpdateProfileScenePassword, setUpdateProfileScenePassword]=useState(false);
    const [flag, setFlag]=useState(false);
    const [newEmail, setNewEmail]=useState('');
   // const updateDispatch = useDispatch()
    const eee=()=>{
        console.log(authUs)
        console.log(user.email)
    }
    
    const changeYourEmail =(email)=>{
        /*updateDispatch(update_email_user({
            email: email
        }))*/
        updateProfileSceneDropHandler();
        setNewEmail(email);
        firebase_auth.currentUser.updateEmail(email)
        console.log(email)
        //setFlag(!flag)
    }
   const changeYourPassword =(password)=>{
    updateProfileSceneDropHandler();
    firebase_auth.currentUser.updatePassword(password)
    console.log(password)
   }
    const updateProfileSceneDropHandler = ()=>{
        setUpdateProfileScene(!dropUpdateProfileScene);
    }
    const updateProfileSceneDropHandlerPassword = ()=>{
        setUpdateProfileScenePassword(!dropUpdateProfileScenePassword);
    }
    const backdropUpdateProfileSceneDropHandler = ()=>{
        setUpdateProfileScene(false);
    }
    const backdropUpdateProfileSceneDropHandlerPassword = ()=>{
        setUpdateProfileScenePassword(false);
    }
    /*useEffect(() => {

        const a = firebase_auth.onAuthStateChanged(()=>{
            updateDispatch(update_email_user({
                email: newEmail
            }))
        })
        
       
        return a
    }, [flag])*/
    return (
        <div className="main_my_profile">
            <header/>
            <div className='profile'>
                {dropUpdateProfileScene ?
                <Backdrop closeBackdrop={backdropUpdateProfileSceneDropHandler}/>:null}
                {dropUpdateProfileScene ?
                <Modal closeBackdrop={backdropUpdateProfileSceneDropHandler} changeEmail = {changeYourEmail}/>:null}
                {dropUpdateProfileScenePassword ?
                <Backdrop2 closeBackdrop={backdropUpdateProfileSceneDropHandlerPassword}/>:null}
                {dropUpdateProfileScenePassword ?
                <Modal2 closeBackdrop={backdropUpdateProfileSceneDropHandler} changePassword = {changeYourPassword}/>:null}
                <div className="user_profile">
                    <ul className="user_profile_table">
                        <li>
                        <h3 className="my_profile_id">Your ID</h3>
                        <div className="my_profile_avatar">{user.uid}</div>
                        </li>
                        <li><div className="my_profile_username">Username <p>{user.name ? user.name : "Username only available for Google Users"}</p></div>
                        {/*<button className="my_profile_button" onClick={eee}>Change your username</button>*/}</li>
                        <li><div className="my_profile_mail">Email <p>{user.email}</p></div>
                        <button className="my_profile_button" onClick={updateProfileSceneDropHandler}>Change your mail</button></li>
                        <li><div className="my_profile_password">Password <p>Change your password via Google Services</p></div>
                        <button className="my_profile_button" onClick={updateProfileSceneDropHandlerPassword}>Change your password</button></li>
                        <li className='my_profile_go_back'><Link to='/'><button className="my_profile_button">Go back</button></Link></li>
                    </ul>
                    <ul className='user_profile_active_groups'>
                    <header/>
                    <h1>Your groups:</h1>
                    </ul>
                </div>
            </div>

            
        </div>
    )
}
