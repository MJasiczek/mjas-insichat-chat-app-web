import React, {useState, useRef} from 'react'
import modalModule from './Modal.module.css'
import {useSelector} from 'react-redux'
import { selectGroupId, selectGroupCreator } from '../../../features/applSlice';
export const Modal2 = (props) => {
    const new_password_ref = useRef();
   const newPass=()=>{
    
    props.changePassword(new_password_ref.current.value);
    closeScene();
   }
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    return (
        <div className={modalModule.modal_delete_scene}>
            <p className={modalModule.p}>Set your new Password!</p>
            <input placeholder="Your new password" type="password" ref={new_password_ref}></input>
            <button className={modalModule.btn_confirm} onClick={newPass}>Confirm</button>
        </div>
    )
}
