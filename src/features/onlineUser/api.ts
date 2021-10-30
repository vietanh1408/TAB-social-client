import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OnlineUserType } from 'Models'

const initialState: any = {
  onlineUsers: []
}

const onlineUserSlice = createSlice({
  name: 'onlineUser',
  initialState,
  reducers: {
    getOnlineUser: (state: OnlineUserType, action: PayloadAction<any>) => {
      state.onlineUsers = action.payload
    },
    addToOnlineList: (state: any, action: PayloadAction<any>) => {
      const checkUserExist = state.onlineUsers.some(
        (user: any) => user._id === action.payload._id
      )
      if (!checkUserExist) {
        state.onlineUsers.push(action.payload)
      }
    }
  }
})

const { reducer } = onlineUserSlice
export const { getOnlineUser, addToOnlineList } = onlineUserSlice.actions
export default reducer
