import React , {useEffect, useState} from 'react'
import './AddGroup.css'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton} from "@material-ui/core"
import firebase_db from '../../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';

 export const AddGroup = (props) => {
    
     
     const isOpen=()=>{
         props.isnewGroupOpen();
                           
    }
 
 
    const [groupName, setGroupName] = useState('');
    const [groupStatusPrivate, setGroupStatusPrivate]=useState(false);
    const [content, setContent] = useState()
    const user = useSelector(selectUser);
    let groupAdded =(e)=>{
        e.preventDefault();
        if(groupName){
            /*firebase_db.collection("groups").add({
                groupName: groupName
            });*/
            if(groupStatusPrivate === 'true'){
                const newGroupTitleObjectPrivate = {
                    groupName: groupName,
                    private: groupStatusPrivate,
                    creator: {
                        email:user.email,
                        uid:user.uid,
                        photo:user.acatar,
                        displayName:user.name
                     },
                     userList:[
                         {
                         email:user.email,
                         uid:user.uid
                        }],
                }
                props.groupAddToDatabase(newGroupTitleObjectPrivate);
            }
            else if(groupStatusPrivate === 'false'){
                const newGroupTitleObjectPublic = {
                    groupName: groupName,
                    private: groupStatusPrivate,
                    creator: {
                        email:user.email,
                        uid:user.uid,
                        photo:user.acatar,
                        displayName:user.name
            },
                    userList:[
                         null],
                }
                props.groupAddToDatabase(newGroupTitleObjectPublic);
            }
            else{
                console.log('cant create group = choose radio '+  typeof (groupStatusPrivate) )
            }
            
           
        }
        else{
            /*setContent( <div className='addGroup_alert_cant-create_group'><h4 style={{color:'red'}}>Can't create group without name</h4></div>)*/
        }
    }
    
    return (
       
       <div className="addGroup" style={{display: props.openAddGroup? "grid":"none"}}>
        <div className='addGroup_field'>
        <h3> Add new Group!</h3>
        <div className="xIcon" ><IconButton onClick={isOpen}><CloseIcon/></IconButton></div>
        <div className="addGroup_main">
        <form>
            <div className="addGroup_input_name">
            <input placeholder="Group Name" value={groupName} onInput={e=>setGroupName(e.target.value)} type="text"></input>
            </div>
            
            <div className="addGroup_input_controls">
            <div className="addGroup_input_controls_1">
            <input type='radio' name='drone' id='public' value={false} onClick={e=>setGroupStatusPrivate(e.target.value)}></input>
            <label id='public'>public</label>
            </div>
            <div className="addGroup_input_controls_2">
            <input type='radio' name='drone'  id='private' value={true} onClick={e=>setGroupStatusPrivate(e.target.value)}></input>
            <label id='private'>private</label>
            </div>
            </div>
            <div className="addGroup_input_submit">
            <button type="submit" onClick={groupAdded}>Add new</button>
            </div>
        </form>
        </div>
        </div>
    </div>
       
    )
}
 {/*<div className="addGroup" style={{display: props.openAddGroup && close? "grid":"none"}}>*/}