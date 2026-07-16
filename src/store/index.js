import { configureStore } from '@reduxjs/toolkit';
import merchantsReducer from './merchantsSlice';

export const store = configureStore({
  reducer: {
    merchants: merchantsReducer
  }
});
