import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import uploadApi from 'api/uploadApi'
import { showError } from 'extensions'

export const fetchUpload = createAsyncThunk(
  'upload/uploading',
  async ({ data, token }: any, { rejectWithValue }) => {
    try {
      const response = await uploadApi.upload(data, token)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const initialState: any = {
  response: null,
  isLoading: false
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpload.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchUpload.fulfilled, (state, action) => {
      state.isLoading = false
      state.response = action.payload
    })
    builder.addCase(fetchUpload.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})
const { reducer } = uploadSlice
export default reducer
