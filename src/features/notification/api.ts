import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showError } from 'extensions'

const initialState: any = {
  notification: null,
  isLoading: false
}

export const fetchCreateNotification = createAsyncThunk(
  'notification/create',
  async ({ msg, user, socketActions }: any, { rejectWithValue }) => {
    try {
      console.log('msg...', msg, 'user...', user, 'socket...', socketActions)
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
})

const { reducer } = notificationSlice
export default reducer
