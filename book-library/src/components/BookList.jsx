import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BookItem from './BookItem'
import {
  deleteBook,
  toggleRead,
  editBook,
} from '../store/booksSlice'

function BookList() {
  const dispatch = useDispatch()
  const books = useSelector(state => state.books)
  const { author, genre, status } = useSelector(state => state.filter)
  const filteredBooks = books.filter(book => {
    const authorMatch = author
      ? book.author.toLowerCase().includes(author.toLowerCase())
      : true
    const genreMatch = genre
      ? book.genre.toLowerCase().includes(genre.toLowerCase())
      : true
    const statusMatch =
      status === 'all'
        ? true
        : status === 'read'
        ? book.read === true
        : book.read === false

    return authorMatch && genreMatch && statusMatch
  })

  const handleDelete = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleRead = (id) => {
    dispatch(toggleRead(id))
  }

  const handleEdit = (id, data) => {
    dispatch(editBook({ id, ...data }))
  }

  if (filteredBooks.length === 0) {
    return <p className="text-center text-gray-500">No books found.</p>
  }

  return (
    <ul>
      {filteredBooks.map(book => (
        <BookItem
          key={book.id}
          book={book}
          onDelete={handleDelete}
          onToggleRead={handleToggleRead}
          onEdit={handleEdit}
        />
      ))}
    </ul>
  )
}

export default BookList
