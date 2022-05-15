import React, {useSelector, useState} from 'react'
import { selectUser } from '../features/userSlice'
import { Route, Redirect } from 'react-router';
export  const PrivateRoute = ({component: Component, ...rest}) => {
    //const userIn = useSelector(selectUser);
  

    return (
        <Route
            {...rest}
            render={props=>{
                
               return  rest.userIn ?  <Component {...props}/>: <Redirect to ='/login'/>
            }
            }
       >
        </Route>
    )
}
