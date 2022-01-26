import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import searchApi from 'api/searchApi'
import { showError } from 'extensions'
import { SearchInput } from 'Models'
import queryString from 'query-string'

interface SearchState {
  isLoading: boolean
  error: any | null
  result: any[]
}

const initialState: SearchState = {
  isLoading: false,
  error: null,
  result: []
}

export const fetchSearch = createAsyncThunk(
  'search/search',
  async (input: string, { rejectWithValue }) => {
    try {
      const searchParams = queryString.parse(input) || {}

      const response = await searchApi.search(searchParams)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearch.fulfilled,
      (state, action: PayloadAction<SearchState>) => {
        state.isLoading = false
        state.result = action.payload.result
      }
    )
  }
})

const { reducer } = searchSlice
export default reducer
