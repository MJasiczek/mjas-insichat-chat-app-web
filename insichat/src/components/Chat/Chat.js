

import React, { useState,useEffect } from 'react'
import {Avatar, IconButton} from "@material-ui/core"
import DuoIcon from '@material-ui/icons/Duo';
import {MoreVert} from '@material-ui/icons';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import "./Chat.css"
import { ChatMSG } from '../ChatMSG/ChatMSG';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectGroupPrivate, selectGroupUserList } from '../../features/applSlice';
import { selectGrouplName,selectGroupId, selectGroupCreator } from '../../features/applSlice';
import firebase_db from '../../firebase';
import firebase from 'firebase';
import Pusher from 'pusher-js'
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal } from '../Alerts/DeleteScene/Modal';
import { Backdrop } from '../Alerts/DeleteScene/Backdrop';
import {useHistory} from 'react-router-dom';
import { BlockedChat } from '../BlockedChat/BlockedChat';
import { RoomOwnerMenu } from '../RoomOwnerMenu/RoomOwnerMenu';
import { Modal3 } from '../Alerts/AddUserScene/Modal';
import {Backdrop3}from '../Alerts/AddUserScene/Backdrop';
import { Modal4 } from '../Alerts/RoomInfoScene/Modal';
import {Backdrop4}from '../Alerts/RoomInfoScene/Backdrop';
const pusher = new Pusher('f2985e74543487d4aa03', {
    cluster: 'eu'
  });
const Chat = () => {

    const [text,setText]=useState('');
    const [msg, setMsg]=useState([]);
    const [blockedChat, setBlockedChat] = useState(false)
    const [dropDeleteGroupScene, setDropDeleteGroupScene]=useState(false);
    const [addUserGroupScene, setAddUserGroupScene] = useState(false);
    const [deleteUserGroupScene, setDeleteUserGroupScene] = useState(false)
    const user = useSelector(selectUser);
    const group_id = useSelector(selectGroupId);
    const group_name = useSelector(selectGrouplName);
    const group_creator = useSelector(selectGroupCreator);
    const group_private = useSelector(selectGroupPrivate)
    const group_userList= useSelector(selectGroupUserList)
    const [deleteButton, setDeleteButton] = useState();
    const [ownerMenu, setOwnerMenu] = useState();
    const [ownerMenuOpen, setOwnerMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const history = useHistory();
    const getMessages = (group_id) =>{
        
          
            if(group_private ==true){
                group_userList.forEach(element =>{
                    if(user.uid===element.uid){
                       
                         try{
                             fetch(`/get/conversation?id=${group_id}`)
                             .then((response)=> {return response.json()})
                             .then((responseJSON)=>{
                       
                        
                      
                                    setMsg(responseJSON[0].groupMSG);
                                    
                                    setBlockedChat(false);
                             })
                   
                    
                            }catch(err){
                              console.log(err)
                                         }
                
            }
                    else{
                        setMsg([]);
                        setBlockedChat(true);
                        
                    }
                    
                })
            }
            
            else{
                fetch(`/get/conversation?id=${group_id}`)
                .then((response)=> {return response.json()})
                .then((responseJSON)=>{
                setMsg(responseJSON[0].groupMSG);
                setBlockedChat(false);
                })
            }
           
    }
    const msgSend=(e)=>{
        e.preventDefault();
       /* firebase_db.collection('groups').doc(group_id).collection("messages").add({
            message:text,
            user:user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });*/

        let ss={
            id:group_id,
            message: text,
            timestamp: Date.now(),
            user:{
                email:user.email,
                uid:user.uid,
                photo:user.avatar,
                displayName:user.name}
            };

        
        fetch(`/new/message?id=${group_id}`, {
            method:'POST',
            body: JSON.stringify(ss),
            headers: {
                'Content-Type': 'application/json',
                
            }
        } )
        console.log(ss)
        setText("");

    }
    

    const deleteRoomSceneDropHandler = ()=>{
        setDropDeleteGroupScene(!dropDeleteGroupScene);
    }
    const backdropRoomDeleteSceneDropHandler = ()=>{
        setDropDeleteGroupScene(false);
    }
    const deleteRoom=(roomToDelete)=>{
        fetch('/update/delete_group', {
            method: "POST",
            body: JSON.stringify(roomToDelete),
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }
    const addUserSceneDropHandler = ()=>{
        setAddUserGroupScene(!addUserGroupScene);
    }
    const backdropAddUserSceneDropHandler = ()=>{
        setAddUserGroupScene(false);
    }
    const deleteserSceneDropHandler = ()=>{
        setAddUserGroupScene(!addUserGroupScene);
    }
    const backdropDeleteUserSceneDropHandler = ()=>{
        setDeleteUserGroupScene(false);
    }
    const openMenu=()=>{
        if([group_creator.uid] == user.uid){
            setOwnerMenuOpen(!ownerMenuOpen)
        }else{
            console.log('essa')
            setUserMenuOpen(!userMenuOpen);
        }
        
    }
    const openModalAdd=(x)=>{
        setAddUserGroupScene(x)
    }
    const openModalRemove=(x)=>{
        setDeleteUserGroupScene(x)
    }
    const addUserToTheRoom = (userToAdd)=>{
        try {
            fetch('/update/add_user_to_group_list', {
                method:'POST',
                body: JSON.stringify(userToAdd),
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            alert('User added')
        } catch (error) {
            console.log(error)
        }
    }
    const deleteUserFromTheRoom = (userToDelete)=>{
        try {
            fetch('/update/delete_user_from_group_list', {
                method:'POST',
                body: JSON.stringify(userToDelete),
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            alert('User deleted')
        } catch (error) {
            console.log(error)
        }
        
    }
    
    useEffect(() => {
        /*if(group_id){
        firebase_db.collection('groups').doc(group_id).collection("messages").orderBy('timestamp', 'asc').onSnapshot(
            snap=>(setMsg(snap.docs.map(doc=>doc.data())))
        )
        }*/
        let content, content2, content3;
        if(group_id){

            getMessages(group_id);
            const channel = pusher.subscribe('groupMSG');
               channel.bind('newGroupMSG', function(data) {
                getMessages(group_id);
                                });
        
           //console.log([{group_creator}])
           //console.log([group_creator.uid])                       //ZAPAMIĘTAĆ - redux ma tablice obiektow, wiec musimy wejsc poprzez tablice do wartosci
           
            if([group_creator.uid] == user.uid){
               content = <IconButton onClick={deleteRoomSceneDropHandler}><DeleteIcon></DeleteIcon></IconButton>;
               setDeleteButton(content);
              /*content3=<RoomOwnerMenu  open={ownerMenuOpen}/>;
               setOwnerMenu(content3);*/
                
            } else{
                content2 = <span/>;
                setDeleteButton(content2);
                
            }
            //setOwnerMenu(false);
            setUserMenuOpen(false);
           /* if(blockedChat){
                contentChatBlock = <BlockedChat />
            }
            else{
                contentChatBlock = null;
            }*/
        
       
    }
        /**/
        
    }, [group_id])
    return (
        <div className="chat">
            <div className="chat_header">
            <div className="chat_details_avatar">
            <Avatar />
            </div>
            
            <div className="chat_details_info">
                <h3>#{group_name}</h3>
                <p>Last Online..</p>
            </div>
            <div className="chat_details_icons">
            <IconButton>
            <DuoIcon/>
            </IconButton>
            <RoomOwnerMenu  open={ownerMenuOpen} modalOpenAdd ={openModalAdd} modalOpenRemove ={openModalRemove}/>
                <IconButton onClick={openMenu}>
                    <MoreVert />
                </IconButton>
                {deleteButton}
                
            </div>
            </div>
            <div className="chat_main">
            {dropDeleteGroupScene ?
            <Modal closeBackdrop={backdropRoomDeleteSceneDropHandler} deleteRoom={deleteRoom}/> : null}
            {dropDeleteGroupScene ?
            <Backdrop closeBackdrop={backdropRoomDeleteSceneDropHandler}/> : null}
             {addUserGroupScene?
            <Modal3 closeBackdrop={backdropAddUserSceneDropHandler} addUserToTheRoom={addUserToTheRoom} />:null}
              {addUserGroupScene?
            <Backdrop3 closeBackdrop={backdropAddUserSceneDropHandler} />:null}
             {deleteUserGroupScene?
            <Modal4 closeBackdrop={backdropDeleteUserSceneDropHandler} deleteUserFromTheRoom={deleteUserFromTheRoom} />:null}
              {deleteUserGroupScene?
            <Backdrop4 closeBackdrop={backdropDeleteUserSceneDropHandler} />:null}
            {blockedChat? 
            <BlockedChat owner={group_creator}/> : null}
                {msg.map(msg=>
                     <ChatMSG key={msg._id} name={msg.user.displayName} email={msg.user.email} msg={msg.message} timestamp={msg.timestamp}/>
                )}
           
   
            </div>
            <div className="chat_msg_field">
                
                <form>
                <EmojiEmotionsIcon/>
                    <input 
                    placeholder={`Send your message! (${group_name})`}
                    type="text"
                    value={text}
                    onInput={e=>setText(e.target.value)}
                    disabled={!group_id}/>
                    <button 
                    type="submit" onClick={msgSend}
                    disabled={!group_id}>Send!</button>
                </form>
            </div>
        </div>
    )
}

export default Chat