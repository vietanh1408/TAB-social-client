import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import friendApi from 'api/friendApi'
import { showError } from 'extensions'

const initialState: any = {
  friends: [],
  isLoading: false
}

export const fetchGetAllFriend = createAsyncThunk(
  'user/getAllFriend',
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
  }
})

const { reducer } = friendSlice
export default reducer
