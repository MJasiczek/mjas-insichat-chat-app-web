import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import applReducer from '../features/applSlice';
import authReducer from '../features/authSlice';

export default configureStore({
  reducer: {
    appl: applReducer,
    user: userReducer,
    auth: authReducer
  },
});