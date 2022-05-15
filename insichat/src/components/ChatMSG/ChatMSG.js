import React from 'react'
import "./ChatMSG.css"

export const ChatMSG = (props) => {
    return (
        <div className="chatMSG">
            <p className="chat_msg ">
             <span className="chat_main_name">{props.name? props.name : props.email}</span>
                    {props.msg}
                    <span className="chat_main_time">
                       {new Date(parseInt(props.timestamp)).toDateString()}
                    </span>
                    </p>
        </div>
    )
}