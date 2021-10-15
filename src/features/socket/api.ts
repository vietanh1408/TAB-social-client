import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SocketType } from 'Models'

const initialState: SocketType = {
  socketActions: null
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketAction: (state: SocketType, action: PayloadAction<any>) => {
      state.socketActions = action.payload
    }
  }
})

const { reducer } = socketSlice
export const { socketAction } = socketSlice.actions
export default reducer
