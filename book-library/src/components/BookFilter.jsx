import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAuthorFilter,
  setGenreFilter,
  setStatusFilter,
  clearFilters,
} from '../store/filterSlice'

function BookFilter() {
  const dispatch = useDispatch()
  const { author, genre, status } = useSelector(state => state.filter)

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto mb-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Filter Books</h2>

      <input
        type="text"
        placeholder="Filter by author"
        value={author}
        onChange={e => dispatch(setAuthorFilter(e.target.value))}
        className="border rounded px-3 py-2"
      />

      <input
        type="text"
        placeholder="Filter by genre"
        value={genre}
        onChange={e => dispatch(setGenreFilter(e.target.value))}
        className="border rounded px-3 py-2"
      />

      <select
        value={status}
        onChange={e => dispatch(setStatusFilter(e.target.value))}
        className="border rounded px-3 py-2"
      >
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>

      <button
        onClick={() => dispatch(clearFilters())}
        className="self-end px-4 py-2 border rounded hover:bg-gray-100"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default BookFilter
