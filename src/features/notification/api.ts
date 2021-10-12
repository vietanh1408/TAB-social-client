import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notificationApi from 'api/notificationApi'
import { showError } from 'extensions'
import { NotificationType } from 'Models'

const initialState: any = {
  notification: null,
  isLoading: false
}

export const fetchCreateNotification = createAsyncThunk(
  'notification/create',
  async (data: NotificationType, { rejectWithValue }) => {
    try {
      const response = await notificationApi.create(data)
      return response
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
