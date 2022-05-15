import React, {useState} from 'react'
import modulecss from './UserListIndividual.module.css'
import { selectUser } from '../../features/userSlice';
import {useSelector} from 'react-redux';
import { selectGroupCreator, selectGroupId } from '../../features/applSlice';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
export const UserListIndividual = (props) => {
    const user = useSelector(selectUser);
    const group_creator = useSelector(selectGroupCreator);
    const group_id = useSelector(selectGroupId);
    const userMail = props.email
    const [content, setContent] = useState()

    /*const checker = ()=>{
        if(userMail==group_creator.email){
            setContent(null)
        }
        else{
            setContent(<p> {userMail}</p>)
        }
    }*/
    const RemoveUser=()=>{
        const userToDelete = {
             id:group_id,
             uid: props.uid
         }
         props.deleteUser(userToDelete)
         
     }
    return (
        <div className={modulecss.user_list}>
            <div className={modulecss.user_list_context}>
            <div className={modulecss.user_list_context_details}>
                {/*<p>id: {props.uid} </p>  */}
                <p>email: {props.email}</p>
                 
                 {user.uid == group_creator.uid && props.email != group_creator.email  ? <IconButton onClick={RemoveUser}><DeleteIcon></DeleteIcon></IconButton> : null}
    
            </div>
            </div>
        </div>
    )
}
