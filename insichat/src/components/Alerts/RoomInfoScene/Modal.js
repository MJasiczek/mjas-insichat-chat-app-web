import React, {useRef} from 'react'
import modalModule from './Modal.module.css'
import {useSelector} from 'react-redux'
import { selectGroupId, selectGroupCreator, selectGroupUserList } from '../../../features/applSlice';
import { UserListIndividual } from '../../UserListIndividual/UserListIndividual';
export const Modal4 = (props) => {
    const group_id = useSelector(selectGroupId);
    const group_creator = useSelector(selectGroupCreator);
    const group_userList = useSelector(selectGroupUserList);
    const user_id_ref = useRef();
    const deleteUser=(userToDelete)=>{
       
        props.deleteUserFromTheRoom(userToDelete);
       
    }
    const closeScene = ()=>{
        props.closeBackdrop();
    }

    return (
        <div className={modalModule.modal_delete_scene}>
            <p className={modalModule.p}>Room Information</p>
            <div className={modalModule.info_chat_room}>
                <p>Creator </p>
                {group_creator.displayName ? group_creator.displayName : group_creator.email}
                <p>Users  </p>
                    {group_userList.map((group_user)=>
                        (<UserListIndividual key={group_user._id} email={group_user.email} uid={group_user.uid} deleteUser ={deleteUser}/>)
                    )
                    }
                </div>
            <button className={modalModule.btn_back} onClick={props.closeBackdrop}>Back</button>
           {/* <button className={modalModule.btn_confirm} onClick={deleteUser}>Confirm</button>*/} 
        </div>
    )
}
