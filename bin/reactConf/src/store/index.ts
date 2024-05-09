
import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todosReducer'
import visibilityFilterReducer from './visibilityFilterReducer'
import isLoginReducer from './isLoginReducer';
 
const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: visibilityFilterReducer,
    login: isLoginReducer
  }
})
 
export default store;