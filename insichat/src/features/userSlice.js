import { createSlice } from '@reduxjs/toolkit';
import { Redirect } from 'react-router-dom';
import { firebase_auth } from '../firebase';

export const userSlice = createSlice({
  name: 'user',
  // The `reducers` field lets us define reducers and generate associated actions
  initialState: {
    user:null,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    login_user: (state, action) => {
      
      state.user = action.payload;
    },
   logout_user: (state) =>{
    state.user = null;
    
   },
   update_email_user:(state, action)=>{
     state.user.email = action.payload.user.email;
     return firebase_auth.currentUser.updateEmail(state.user.email);
   },
   update_password_user:(state, action)=>{
    /*state.user.password = action.payload.user.password;
    return firebase_auth.currentUser.updatePassword(user.password); */
   }
   
  },
});

export const { login_user,logout_user, update_email_user} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = state => state.user.user;

export default userSlice.reducer;
