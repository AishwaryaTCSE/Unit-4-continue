import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  author: '',
  genre: '',
  status: 'all', // all / read / unread
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAuthorFilter: (state, action) => {
      state.author = action.payload
    },
    setGenreFilter: (state, action) => {
      state.genre = action.payload
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload
    },
    clearFilters: (state) => {
      state.author = ''
      state.genre = ''
      state.status = 'all'
    },
  },
})

export const {
  setAuthorFilter,
  setGenreFilter,
  setStatusFilter,
  clearFilters,
} = filterSlice.actions
export default filterSlice.reducer
