import React, {useRef} from 'react'
import modalModule from './Modal.module.css'
import {useSelector} from 'react-redux'
import { selectGroupId, selectGroupCreator } from '../../../features/applSlice';
export const Modal3 = (props) => {
    const group_id = useSelector(selectGroupId)
    const user_id_ref = useRef();
    const user_email_ref = useRef();
   
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    const addUser = ()=>{
        const userToAdd = {
            id:group_id,
            uid: user_id_ref.current.value,
            email: user_email_ref.current.value
        }
        props.addUserToTheRoom(userToAdd);
        closeScene();
    }
    return (
        <div className={modalModule.modal_add_user_scene}>
            <p className={modalModule.p}>Add-user menu</p>
            <div className={modalModule.controls_add_user}>
                <label id='user_id'>User id: </label>
                <input id='user_id' className={modalModule.user_id_field} type='text' ref={user_id_ref} required></input>
                <label id='user_email'>User email: </label>
                <input id='user_email' className={modalModule.user_id_field} type='email' ref={user_email_ref} required></input>
            </div>
            <button className={modalModule.btn_back} onClick={props.closeBackdrop}>Back</button>
            <button className={modalModule.btn_confirm} onClick={addUser}>Confirm</button>
        </div>
    )
}
