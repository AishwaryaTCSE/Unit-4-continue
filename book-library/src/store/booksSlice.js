import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  // Example book
  // {
  //   id: '1',
  //   title: '1984',
  //   author: 'George Orwell',
  //   genre: 'Dystopian',
  //   read: false,
  // }
]

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload)
    },
    deleteBook: (state, action) => {
      return state.filter(book => book.id !== action.payload)
    },
    toggleRead: (state, action) => {
      const book = state.find(book => book.id === action.payload)
      if (book) {
        book.read = !book.read
      }
    },
    editBook: (state, action) => {
      const { id, title, author, genre } = action.payload
      const book = state.find(book => book.id === id)
      if (book) {
        book.title = title
        book.author = author
        book.genre = genre
      }
    },
  },
})

export const { addBook, deleteBook, toggleRead, editBook } = booksSlice.actions
export default booksSlice.reducer
