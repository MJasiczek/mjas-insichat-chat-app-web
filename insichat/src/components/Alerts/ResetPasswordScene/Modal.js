import React, {useState, useRef} from 'react'
import modalResetPassword from './Modal.module.css'
import {useSelector} from 'react-redux'
import { selectGroupId, selectGroupCreator } from '../../../features/applSlice';
export const Modal = (props) => {
    /*const x = true;
    const Redirection=()=>{
        props.RedirectFun(x);
        closeScene();
    }*/
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    return (
        <div className={modalResetPassword.modal_delete_scene}>
            <p className={modalResetPassword.p}>Check your Email for futhure information</p>
            <button className={modalResetPassword.btn_confirm} onClick={closeScene}>Confirm</button>
        </div>
    )
}
