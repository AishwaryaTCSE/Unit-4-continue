import React from 'react'
import BookForm from './components/BookForm'
import BookFilter from './components/BookFilter'
import BookList from './components/BookList'
import { useDispatch } from 'react-redux'
import { addBook } from './store/booksSlice'
import { nanoid } from 'nanoid'

function App() {
  const dispatch = useDispatch()

  const handleAddBook = ({ title, author, genre }) => {
    dispatch(addBook({ id: nanoid(), title, author, genre, read: false }))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Book Library</h1>

      <BookForm onSubmit={handleAddBook} />

      <BookFilter />

      <BookList />
    </div>
  )
}

export default App
