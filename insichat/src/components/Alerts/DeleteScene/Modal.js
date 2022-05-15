import React from 'react'
import modalModule from './Modal.module.css'
import {useSelector} from 'react-redux'
import { selectGroupId, selectGroupCreator } from '../../../features/applSlice';
export const Modal = (props) => {
    const group_id = useSelector(selectGroupId)
    const deleteGroup=()=>{
       const idGroupToDelete = {
            id:group_id,
        }
        props.deleteRoom(idGroupToDelete);
        closeScene();
    }
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    return (
        <div className={modalModule.modal_delete_scene}>
            <p className={modalModule.p}>Do you really wanna delete this group?</p>
            <button className={modalModule.btn_back} onClick={props.closeBackdrop}>Back</button>
            <button className={modalModule.btn_confirm} onClick={deleteGroup}>Confirm</button>
        </div>
    )
}
