import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'https://jsonmock.hackerrank.com/api/football_matches?page=2'

export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async () => {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data.data
  }
)

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    isLoading: false,
    isError: false,
    footballMatches: [],
    favorites: [],
    searchTerm: '',
    filters: {
      team: '',
      venue: '',
      date: '',
      outcome: '', 
    },
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setFilterTeam: (state, action) => {
      state.filters.team = action.payload
    },
    setFilterVenue: (state, action) => {
      state.filters.venue = action.payload
    },
    setFilterDate: (state, action) => {
      state.filters.date = action.payload
    },
    setFilterOutcome: (state, action) => {
      state.filters.outcome = action.payload
    },
    toggleFavorite: (state, action) => {
      const matchId = action.payload
      if (state.favorites.includes(matchId)) {
        state.favorites = state.favorites.filter(id => id !== matchId)
      } else {
        state.favorites.push(matchId)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false
        state.footballMatches = action.payload
      })
      .addCase(fetchMatches.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const {
  setSearchTerm,
  setFilterTeam,
  setFilterVenue,
  setFilterDate,
  setFilterOutcome,
  toggleFavorite,
} = matchesSlice.actions

export default matchesSlice.reducer
