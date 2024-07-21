import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice';
import loginReducer from './login/login';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer
  },
})