import { createSlice } from '@reduxjs/toolkit'
import { SocketType } from 'Models'

const initialState: SocketType = {
  socketActions: null
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketAction: (state: SocketType, { payload }) => {
      state.socketActions = payload
    }
  }
})

const { reducer } = socketSlice
export const { socketAction } = socketSlice.actions
export default reducer
