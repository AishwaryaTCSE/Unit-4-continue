import { configureStore, combineReducers } from '@reduxjs/toolkit'
import booksReducer from './booksSlice'
import filterReducer from './filterSlice'

const rootReducer = combineReducers({
  books: booksReducer,
  filter: filterReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
