import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index'
export default configureStore({
  reducer: rootReducer
})
