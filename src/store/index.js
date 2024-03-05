import {configureStore} from '@reduxjs/toolkit';
import todoSlice from './todo';


const store = configureStore({
  reducer: {
   todo: todoSlice.reducer
  }
});

export default store;