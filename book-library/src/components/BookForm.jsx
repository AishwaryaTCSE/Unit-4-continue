import React, { useState, useEffect } from 'react'

function BookForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setAuthor(initialData.author)
      setGenre(initialData.genre)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !author.trim() || !genre.trim()) return
    onSubmit({ title, author, genre })
    setTitle('')
    setAuthor('')
    setGenre('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 max-w-md mx-auto"
    >
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Book title"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Author</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Genre</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre"
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {initialData ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  )
}

export default BookForm
