import React from 'react'
import { Avatar } from '@material-ui/core'
import sidebarChat from "./SidebarChat.module.css"
import { selectUser } from '../../features/userSlice';
import {useSelector} from 'react-redux'
export const SidebarChat = () => {
    const userInfo =  useSelector(selectUser);
    return (
        <div className ={sidebarChat.sidebar_chat}>
            <Avatar />
            <div className={sidebarChat.sidebar_chat_details}>
                 <h2>#Welcome, {userInfo.name}</h2>
                <p>Welcome to Chatting Web App!</p>
            </div>
        </div>
    )
}