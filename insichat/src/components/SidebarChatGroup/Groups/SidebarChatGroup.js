import React, { useEffect } from 'react'
import { Avatar, Button } from '@material-ui/core'
import SidebarChatGroupModuleCss from"./SidebarChatGroup.module.css"
import {useSelector, useDispatch} from 'react-redux'
import { setGroupContext } from '../../../features/applSlice'
import LockIcon from '@material-ui/icons/Lock';


export const SidebarChatGroup = (props) => { //id, key,groupInfo
  
  const dispatch = useDispatch();
  const chooseGroup = ()=>{
      dispatch(setGroupContext({
          group_id: props.id,
          group_name: props.groupInfo,
          group_creator: props.creator,
          group_private: props.private,
          group_userList: props.userList

      }))
  }
  
  
  const l =()=>{
     // console.log(props.creator)
    
  }
  
    return (
        <div className ={SidebarChatGroupModuleCss.sidebar_chat} >
            <div className={SidebarChatGroupModuleCss.sidebar_chat_context} onClick={chooseGroup}><Avatar onClick={l} />
            <div className={SidebarChatGroupModuleCss.sidebar_chat_details}>
                 <h2>#{props.groupInfo}</h2>
                <p>Owner: {props.creator.displayName? props.creator.displayName : props.creator.email} </p> {/*props.id*/ }
            </div>
            </div>
            {props.private? <LockIcon/>: null}
            
            
        </div>
    )
}