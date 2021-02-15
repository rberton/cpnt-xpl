  
import { combineReducers } from '@reduxjs/toolkit'

import authentificationReducer from '../features/authentification/authentificationSlice'

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    authentification: authentificationReducer,
    ...injectedReducers
  })
  return rootReducer
}