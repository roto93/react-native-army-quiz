import { combineReducers } from "@reduxjs/toolkit";
import modeReducer from './modeReducer'
import sheetReducer from './sheetReducer'
import typeReducer from "./typeReducer";

const rootReducer = combineReducers({
  modeReducer,
  sheetReducer,
  typeReducer
})

export default rootReducer