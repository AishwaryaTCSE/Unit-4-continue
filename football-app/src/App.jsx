import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMatches,
  setSearchTerm,
  setFilterTeam,
  setFilterVenue,
  setFilterDate,
  setFilterOutcome,
  toggleFavorite,
} from './store/matchesSlice'

function SearchBar() {
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.matches.searchTerm)

  return (
    <input
      type="text"
      placeholder="Search by team, venue, or date"
      value={searchTerm}
      onChange={e => dispatch(setSearchTerm(e.target.value))}
      className="border p-2 rounded w-full max-w-md mb-4"
    />
  )
}

function Filters() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.matches.filters)

  return (
    <div className="flex flex-wrap gap-4 mb-6 max-w-xl">
      <input
        type="text"
        placeholder="Filter by Team"
        value={filters.team}
        onChange={e => dispatch(setFilterTeam(e.target.value))}
        className="border p-2 rounded flex-grow min-w-[150px]"
      />
      <input
        type="text"
        placeholder="Filter by Venue"
        value={filters.venue}
        onChange={e => dispatch(setFilterVenue(e.target.value))}
        className="border p-2 rounded flex-grow min-w-[150px]"
      />
      <input
        type="date"
        value={filters.date}
        onChange={e => dispatch(setFilterDate(e.target.value))}
        className="border p-2 rounded"
      />
      <select
        value={filters.outcome}
        onChange={e => dispatch(setFilterOutcome(e.target.value))}
        className="border p-2 rounded"
      >
        <option value="">All Outcomes</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
        <option value="draw">Draw</option>
      </select>
    </div>
  )
}

function MatchItem({ match, isFavorite, onToggleFavorite }) {
  const {
    competition,
    year,
    round,
    team1,
    team2,
    team1goals,
    team2goals,
    venue,
    date,
    winner,
  } = match

  const outcome =
    winner === 'draw'
      ? 'Draw'
      : winner === team1
      ? `${team1} Won`
      : winner === team2
      ? `${team2} Won`
      : 'N/A'

  return (
    <div className="border rounded p-4 mb-3 bg-white shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">
          {team1} vs {team2}
        </h3>
        <button
          onClick={() => onToggleFavorite(match.id)}
          className={`text-xl ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
          aria-label="Toggle favorite"
        >
          ★
        </button>
      </div>
      <p>
        <strong>Venue:</strong> {venue} | <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Competition:</strong> {competition} | <strong>Year:</strong> {year} |{' '}
        <strong>Round:</strong> {round}
      </p>
      <p>
        <strong>Score:</strong> {team1goals} - {team2goals}
      </p>
      <p>
        <strong>Outcome:</strong> {outcome}
      </p>
    </div>
  )
}

function MatchesList() {
  const dispatch = useDispatch()
  const {
    footballMatches,
    favorites,
    searchTerm,
    filters,
    isLoading,
    isError,
  } = useSelector(state => state.matches)

  if (isLoading) return <p className="text-center">Loading matches...</p>
  if (isError) return <p className="text-center text-red-600">Error loading matches!</p>
  const matchesWithId = footballMatches.map((m, i) => ({ ...m, id: i }))
  const filtered = matchesWithId.filter((match) => {
    const lowerSearch = searchTerm.toLowerCase()
    const searchMatch =
      match.team1.toLowerCase().includes(lowerSearch) ||
      match.team2.toLowerCase().includes(lowerSearch) ||
      match.venue.toLowerCase().includes(lowerSearch) ||
      match.date.toLowerCase().includes(lowerSearch)

    const teamFilter = filters.team
      ? match.team1.toLowerCase().includes(filters.team.toLowerCase()) ||
        match.team2.toLowerCase().includes(filters.team.toLowerCase())
      : true

    const venueFilter = filters.venue
      ? match.venue.toLowerCase().includes(filters.venue.toLowerCase())
      : true

    const dateFilter = filters.date ? match.date === filters.date : true

    const outcomeFilter = (() => {
      if (!filters.outcome) return true
      if (filters.outcome === 'draw') return match.winner === 'draw'
      if (filters.outcome === 'win')
        return match.winner !== 'draw' && match.winner === match.team1
      if (filters.outcome === 'loss')
        return match.winner !== 'draw' && match.winner === match.team2
      return true
    })()

    return searchMatch && teamFilter && venueFilter && dateFilter && outcomeFilter
  })

  if (filtered.length === 0)
    return <p className="text-center text-gray-500">No matches found</p>

  return (
    <div>
      {filtered.map(match => (
        <MatchItem
          key={match.id}
          match={match}
          isFavorite={favorites.includes(match.id)}
          onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        />
      ))}
    </div>
  )
}

function FavoritesList() {
  const { footballMatches, favorites } = useSelector(state => state.matches)
  const dispatch = useDispatch()

  const matchesWithId = footballMatches.map((m, i) => ({ ...m, id: i }))
  const favoriteMatches = matchesWithId.filter(match => favorites.includes(match.id))

  if (favoriteMatches.length === 0)
    return <p className="text-center mt-8">No favorite matches yet.</p>

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Favorite Matches</h2>
      {favoriteMatches.map(match => (
        <MatchItem
          key={match.id}
          match={match}
          isFavorite={true}
          onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        />
      ))}
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMatches())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Football Matches Tracker</h1>
      <div className="max-w-xl mx-auto">
        <SearchBar />
        <Filters />
        <MatchesList />
        <FavoritesList />
      </div>
    </div>
  )
}
