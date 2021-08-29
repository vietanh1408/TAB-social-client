import { createSlice } from '@reduxjs/toolkit'
import { NotificationType } from 'Models'

const initialState: NotificationType = {
  success: false,
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {}
})

const { reducer } = notificationSlice
export default reducer
