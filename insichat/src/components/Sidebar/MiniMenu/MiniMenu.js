import React from 'react'
import './MiniMenu.css'
import { firebase_auth} from '../../../firebase';
import { Link } from 'react-router-dom';
export const MiniMenu = (props) => {

    const logOut=()=>{
        firebase_auth.signOut();
    }
    return (
        
      <div className="MiniMenu" style={{display: props.open ? 'block':'none'}}>
  
          <li><button onClick={logOut}>Logout</button></li>
          <li><Link to='/my_profile'><button className="my_profile_path" >My Profile</button></Link></li>
           

      </div>
            
    )
}