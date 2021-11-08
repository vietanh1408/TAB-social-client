import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import friendApi from 'api/friendApi'
import { showError } from 'extensions'
import { Pagination } from 'Models'

const initialState: any = {
  friends: [],
  requests: [],
  totalRequests: 0,
  isLoading: false,
  isLoadingRequests: false
}

export const fetchGetAllFriend = createAsyncThunk(
  'friend/getAllFriend',
  async (_, { rejectWithValue }) => {
    try {
      const response = await friendApi.getAllFriend()
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchGetRequests = createAsyncThunk(
  'friend/getRequests',
  async (pagination: Pagination | undefined, { rejectWithValue }) => {
    try {
      const response = await friendApi.getRequests(pagination)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response)
    }
  }
)

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchGetAllFriend.pending,
        (state: any, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )
      .addCase(
        fetchGetAllFriend.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isLoading = false
          state.friends = action.payload.friends
        }
      )
      .addCase(
        fetchGetAllFriend.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.isLoading = false
        }
      )

      // get friend request
      .addCase(
        fetchGetRequests.pending,
        (state, action: PayloadAction<any>) => {
          state.isLoadingRequests = true
        }
      )

      .addCase(
        fetchGetRequests.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoadingRequests = false
          state.requests = action.payload.friendRequests
          state.totalRequests = action.payload.total
        }
      )

      .addCase(
        fetchGetRequests.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoadingRequests = false
        }
      )
  }
})

const { reducer } = friendSlice
export default reducer
