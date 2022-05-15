import React, {useState} from 'react'
import RoomOwnerMenuCSS from './RoomOwnerMenu.module.css'

export const RoomOwnerMenu = (props) => {
    const open = props.open;
    const openModalAdd=()=>{
        props.modalOpenAdd(true)
    }
    const openModalRemove=()=>{
        props.modalOpenRemove(true)
    }
   
   
    return (
        <div className={RoomOwnerMenuCSS.main_menu} style={{display: open? 'block' : 'none'}}>
           
            <li><button className={RoomOwnerMenuCSS.add_user} onClick={openModalAdd}>Add user to the room</button></li>
            <li><button className={RoomOwnerMenuCSS.delete_user} onClick={openModalRemove}>Get room info</button></li>
        </div>
    )
}
