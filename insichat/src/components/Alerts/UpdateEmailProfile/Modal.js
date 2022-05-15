import React, {useState, useRef} from 'react'
import modalModule from './Modal.module.css'
import {useSelector} from 'react-redux'
import { selectGroupId, selectGroupCreator } from '../../../features/applSlice';
export const Modal = (props) => {
    const new_mail_ref = useRef();
   const newMail=()=>{
    
    props.changeEmail(new_mail_ref.current.value);
    closeScene();
   }
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    return (
        <div className={modalModule.modal_delete_scene}>
            <p className={modalModule.p}>Set your new Mail!</p>
            <input placeholder="Your new email" type="mail" ref={new_mail_ref}></input>
            <button className={modalModule.btn_confirm} onClick={newMail}>Confirm</button>
        </div>
    )
}
