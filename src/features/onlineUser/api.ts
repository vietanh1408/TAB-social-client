import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { OnlineUserType } from 'Models'

const initialState: OnlineUserType = {
  onlineUsers: []
}

export const fetchGetOnlineUser = createAsyncThunk(
  'onlineUser/online',
  async () => {}
)

const onlineUserSlice = createSlice({
  name: 'onlineUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchGetOnlineUser.fulfilled,
      (state: OnlineUserType, action) => {
        state.onlineUsers = action.payload
      }
    )
  }
})

const { reducer } = onlineUserSlice
export default reducer
