import React from 'react'
import blockedChatCSS from './BlockedChat.module.css'
export const BlockedChat = (props) => {
    
    const {email} = props.owner
    return (
        <div className ={blockedChatCSS.blockedChat_main}>
            <div className={blockedChatCSS.blockedChat_main_content}>
                <h3 className={blockedChatCSS.h3}>To visit this room you have to be on a white-list</h3>
                <h4 className={blockedChatCSS.h4} >Owner: { email} </h4>
            </div>
        </div>
    )
}
