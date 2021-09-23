import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postApi from 'api/postApi'
import { showError } from 'extensions'

const initialState: any = {
  post: [],
  isLoading: false
}

export const fetchGetAllPost = createAsyncThunk(
  'post/getAllPost',
  async (token: any, { rejectWithValue }) => {
    try {
      const response = await postApi.get(token)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchCreatePost = createAsyncThunk(
  'post/createPost',
  async ({ data, token }: any, { rejectWithValue }) => {
    try {
      const response = await postApi.create(data, token)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get post
      .addCase(fetchGetAllPost.pending, (state, action) => {
        state.isLoading = true
      })

      .addCase(fetchGetAllPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.post = action.payload.posts
      })

      .addCase(fetchGetAllPost.rejected, (state, action) => {
        state.isLoading = false
      })

      // create post
      .addCase(fetchCreatePost.pending, (state, action) => {
        state.isLoading = true
      })

      .addCase(fetchCreatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.post = [action.payload.post, ...state.post]
      })

      .addCase(fetchCreatePost.rejected, (state, action) => {
        state.isLoading = false
      })
  }
})

const { reducer } = postSlice

export default reducer
