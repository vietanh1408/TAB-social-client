import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import searchApi from 'api/searchApi'
import { showError } from 'extensions'
import { PostType, SearchInput, SearchResult, UserType } from 'Models'
import queryString from 'query-string'

interface SearchState {
  isLoading: boolean
  error: any | null
  result: Partial<SearchResult> | null
}

const initialState: SearchState = {
  isLoading: false,
  error: null,
  result: null
}

export const fetchSearch = createAsyncThunk(
  'search/search',
  async (input: string, { rejectWithValue }) => {
    try {
      const searchParams: SearchInput = queryString.parse(input) || {}
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
    builder

      .addCase(fetchSearch.pending, (state: SearchState) => {
        state.isLoading = true
      })
      .addCase(
        fetchSearch.fulfilled,
        (state: SearchState, action: PayloadAction<SearchState>) => {
          state.isLoading = false
          state.result = action.payload.result
        }
      )

      .addCase(fetchSearch.rejected, (state: SearchState) => {
        state.isLoading = false
      })
  }
})

const { reducer } = searchSlice
export default reducer
