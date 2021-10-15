import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import notificationApi from 'api/notificationApi'
import { showError } from 'extensions'
import { NotificationState, NotificationType } from 'Models'

const initialState: NotificationState = {
  notificationCount: 0,
  notification: [],
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

export const fetchGetNotification = createAsyncThunk(
  'notification/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationApi.get()
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotification: (
      state: NotificationState,
      action: PayloadAction<NotificationType>
    ) => {
      // check trung thong bao
      // const isDuplicateNotification = state.notification.some(
      //   (item: any) => item?.text === action.payload.text
      // )
      // if (!isDuplicateNotification) {
      //   state.notification.unshift(action.payload)
      //   state.notificationCount++
      // }
      state.notification.unshift(action.payload)
      state.notificationCount++
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchGetNotification.pending,
        (state: NotificationState, action: PayloadAction<any>) => {
          state.isLoading = true
          state.notificationCount = 0
        }
      )

      .addCase(
        fetchGetNotification.rejected,
        (state: NotificationState, action: PayloadAction<any>) => {
          state.isLoading = false
        }
      )

      .addCase(
        fetchGetNotification.fulfilled,
        (state: NotificationState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.notification = action.payload.notifications
          state.notificationCount = action.payload.notificationCount
        }
      )
  }
})

const { reducer, actions } = notificationSlice
export const { getNotification } = actions
export default reducer
