
import React, { useState, useEffect, useRef } from 'react'
import "./Sidebar.css"
import {Avatar, IconButton} from "@material-ui/core"
import ChatIcon from '@material-ui/icons/Chat';
import {SearchOutlined} from '@material-ui/icons';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import {useSelector} from 'react-redux';
import { SidebarChat } from '../SidebarChatGroup/SidebarChat';
import {SidebarChatGroup} from '../SidebarChatGroup/Groups/SidebarChatGroup'
import { selectUser } from '../../features/userSlice';
import { MiniMenu } from './MiniMenu/MiniMenu';
import firebase_db from '../../firebase'
import { AddGroup } from './AddGroup/AddGroup';
import Refresh from './Refresh/Refresh';
import Pusher from 'pusher-js'
import axios from './../../axios';

const pusher = new Pusher('f2985e74543487d4aa03', {
    cluster: 'eu'
  });

const Sidebar = () => {
  const userInfo =  useSelector(selectUser);
  const searchInput = useRef(null);
    let [menu, setMenuOpen] = useState(false);
        const isOpen=()=>{
            setMenuOpen(!menu);
        }
    let [newGroupOpen, setnewGroupOpen] = useState(false);
        const isnewGroupOpen=()=>{
            setnewGroupOpen(prevnewGroupOpen=>!prevnewGroupOpen);
            
        }
    const [group, setGroup] = useState([]);
    const [refresh,  setRefresh] = useState(true)
    const [OPEN,  setOPEN] = useState(undefined)
    const [xx,  setXx] = useState(false)

        const refreshButton =()=>{
            setRefresh(true);
            setTimeout(()=>{setRefresh(false); setXx(prevxx=>!prevxx) }, 2400);
        }

        const getChannels = ()=>{
            try{
                fetch('/get/groupList')
                .then((response)=> {return response.json()})
                .then((responseJSON)=>{
                    const groups= [];
                    for(const key in responseJSON){
                        const group={
                            _id:key,
                            ...responseJSON[key]
                        }
                        groups.push(group)
                    }
                    
                    
                    setGroup(groups);
                    setRefresh(false);
                    console.log(groups)
                })
                
            }catch(err){
                console.log(err)
            }}
            const groupAddToDatabase=(newGroupObject)=>{
                fetch('/new/group',{
                    method: 'POST',
                    body: JSON.stringify(newGroupObject),
                    headers: {
                        'Content-Type': 'application/json'
                    }
        
                })
            }
        useEffect(() => {
            /*firebase_db.collection("groups").onSnapshot((snap) =>(
                SetGroup(snap.docs.map((doc) =>({
                    id: doc.id,
                    group_info: doc.data(),
                   
                })))
            ));*/
            getChannels();
         }, [xx]);
         useEffect(() => {
            //FIREBASE
          /* firebase_db.collection("groups").onSnapshot((snap) =>(
               SetGroup(snap.docs.map((doc) =>({
                   id: doc.id,
                   group_info: doc.data(),
                  
               })))
           ));*/
           
            
            
               getChannels();
               const channel = pusher.subscribe('groupForPusher');
               channel.bind('newGroupPusher', function(data) {
                    getChannels();
                                });
        }, []);

        /* const [loading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    useEffect(() => {
        setLoading(true);
        fetch('https://testreact-afc76-default-rtdb.firebaseio.com/posts.json')
            .then((response) =>{ return response.json()})
            .then((data)=>{
                const posts =[];
                for(const key in data){
                    const post={
                        id: key,
                        ...data[key]
                    }
                    posts.push(post);
                }
                
            setLoading(false);
            setAllPosts(posts);
            }
            )
        
    }, [])*/
         //SERVER PART
         
   
    useEffect(() => {
     setnewGroupOpen(false);
 
    }, [])
    const searchIconClick=()=>{
        searchInput.current.focus();
    }
   
    
    return (
        <div className="sidebar">   
            <div className="sidebar_header">
            <div className="sidebar_headerLeft"> 
            <Avatar className="avatar" onClick={isOpen}/>
            <MiniMenu open={menu}/>
            </div>
            <div className="sidebar_headerRight"> 
            <IconButton onClick={isnewGroupOpen}>
            <ChatIcon/>
            </IconButton>
            <IconButton onClick={searchIconClick} >
                    <SearchOutlined />
                </IconButton>
            
            <IconButton onClick={refreshButton}>
            <RefreshIcon/>
            </IconButton>
            </div>
            </div>
            <div className="sidebar_search">
            <div className="sidebar_search_container">
            <SearchIcon/>
            <input placeholder="Search chat group!" type="text" ref={searchInput}></input>
            </div>            
            </div>
            {refresh ? <Refresh />: null}
            <div className="sidebar_chat_groups">
            <AddGroup openAddGroup={newGroupOpen} groupAddToDatabase={groupAddToDatabase} isnewGroupOpen={isnewGroupOpen}/>
            <SidebarChat />
           
                             
                             {/* FOR FIREBASE:  {group.map((group) =>
                                <SidebarChatGroup key={group.id} id={group.id} groupInfo={group.group_info.groupName} />
                                */}
                                {group.map((groupO) =>
                                    //console.log(groupO.creator)
                                    <SidebarChatGroup key={groupO._id} id={groupO._id} groupInfo={groupO.groupName} creator={groupO.creator} private={groupO.private} userList={groupO.userList} />
                                )}
                             
            
              

            </div>
        
        </div>
    )
}

export default Sidebar