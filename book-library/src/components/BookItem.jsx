import React, { useState } from 'react'

function BookItem({ book, onDelete, onToggleRead, onEdit }) {
  const [editing, setEditing] = useState(false)

  const [editData, setEditData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
  })

  const handleChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = () => {
    if (
      !editData.title.trim() ||
      !editData.author.trim() ||
      !editData.genre.trim()
    ) return
    onEdit(book.id, editData)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: book.title,
      author: book.author,
      genre: book.genre,
    })
    setEditing(false)
  }

  return (
    <li className="border p-4 rounded mb-3 bg-white shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
      {editing ? (
        <div className="flex flex-col gap-2 flex-grow">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            placeholder="Title"
          />
          <input
            type="text"
            name="author"
            value={editData.author}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            placeholder="Author"
          />
          <input
            type="text"
            name="genre"
            value={editData.genre}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            placeholder="Genre"
          />
        </div>
      ) : (
        <div className="flex-grow mb-2 sm:mb-0">
          <h3
            className={`text-lg font-semibold ${
              book.read ? 'line-through text-gray-400' : ''
            }`}
          >
            {book.title}
          </h3>
          <p className="text-gray-700">Author: {book.author}</p>
          <p className="text-gray-700">Genre: {book.genre}</p>
          <p className="text-sm text-gray-500">
            Status: {book.read ? 'Read' : 'Unread'}
          </p>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="border px-3 py-1 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onToggleRead(book.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Mark as {book.read ? 'Unread' : 'Read'}
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default BookItem
