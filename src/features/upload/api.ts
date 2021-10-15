import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import uploadApi from 'api/uploadApi'
import { showError } from 'extensions'
import { DataRemoveUpload, DataUpload, ResponseState } from 'Models'

export const fetchUpload = createAsyncThunk(
  'upload/uploading',
  async (data: DataUpload, { rejectWithValue }) => {
    try {
      const response = await uploadApi.upload(data)
      console.log('response....', response.data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchRemoveUpload = createAsyncThunk(
  'upload/remove-upload',
  async (data: DataRemoveUpload, { rejectWithValue }) => {
    try {
      const response = await uploadApi.removeUpload(data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const initialState: ResponseState = {
  response: null,
  isLoading: false
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // upload
    builder.addCase(
      fetchUpload.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true
      }
    )
    builder.addCase(
      fetchUpload.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.response = action.payload
      }
    )
    builder.addCase(
      fetchUpload.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false
      }
    )

    // remove
    builder.addCase(
      fetchRemoveUpload.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true
      }
    )
    builder.addCase(
      fetchRemoveUpload.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.response = null
      }
    )
    builder.addCase(
      fetchRemoveUpload.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false
      }
    )
  }
})
const { reducer } = uploadSlice
export default reducer
