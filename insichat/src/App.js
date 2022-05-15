import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { selectUser, login_user, logout_user } from './features/userSlice';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import { firebase_auth } from './firebase';
import './App.css';
import { Switch, Route} from 'react-router-dom'
import { Main } from './pages/Main';
import { MyProfile } from './pages/MyProfile';
import { PasswordForgot } from './pages/PasswordForgot';
import { Redirect } from 'react-router';
function App() {
  const userIn = useSelector(selectUser);

  const  dispatch = useDispatch();
  useEffect(() => {
    const a = firebase_auth.onAuthStateChanged((xUser) =>{
      if(xUser){
            //loged
            dispatch(login_user({
              uid: xUser.uid,
              name: xUser.displayName,
              email: xUser.email,
              avatar: xUser.photoURL
            }));
      }
      else{
            dispatch(logout_user()) ;//out
      }
    })
    return a;
  }, [dispatch])
  return (
    <div className="App">
      
      {userIn ? (
        <>
         <Redirect to='/'/>
     <Switch>
       <Route path='/' component={Main} exact auth authPage={<Login/>}></Route>
       <Route path='/my_profile' component={MyProfile} auth authPage={<Login/>}><MyProfile/></Route>
     </Switch>
     </>
     )
     : 
     (
     <>
      <Redirect to='/login'/>
     <Switch>
     <Route path='/login' component={Login} />
     <Route path='/password_forgot' component={PasswordForgot} />
    
     </Switch>
     
     </>)}
    {/*<Switch>
       <PrivateRoute path='/' component={Main} exact auth authPage={<Login/> }></PrivateRoute>
       <PrivateRoute path='/my_profile' component={MyProfile} auth authPage={<Login/>}><MyProfile/></PrivateRoute>
       <Route path='/login' component={Login} />
        <Route path='/password_forgot' component={PasswordForgot} />
     </Switch>
      */}
    </div>
  );
}

export default App;