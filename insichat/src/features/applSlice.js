import { createSlice } from '@reduxjs/toolkit';

export const applSlice = createSlice({
name: 'appl',
initialState: {
    group_id:null,
    group_name:null,
    group_creator:null,
    group_private:null,
    group_userList:[null]
  },
  reducers: {
    setGroupContext: (state, action) => {
      
      state.group_id = action.payload.group_id;
      state.group_name = action.payload.group_name;
      state.group_creator = action.payload.group_creator;
      state.group_private = action.payload.group_private;
      state.group_userList = action.payload.group_userList;
    
    },
  
  },
});

export const { setGroupContext } = applSlice.actions;


export const selectGroupId = state => state.appl.group_id;
export const selectGrouplName = state => state.appl.group_name;
export const selectGroupCreator = state => state.appl.group_creator;
export const selectGroupPrivate= state => state.appl.group_private;
export const selectGroupUserList = state =>state.appl.group_userList;

export default applSlice.reducer;