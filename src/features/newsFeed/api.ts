import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postApi from 'api/postApi'
import { showError } from 'extensions'
import { CreatePostInput } from 'Models'

const initialState: any = {
  post: [],
  isLoading: false
}

export const fetchGetAllPost = createAsyncThunk(
  'post/getAllPost',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApi.get()
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchCreatePost = createAsyncThunk(
  'post/createPost',
  async (data: CreatePostInput, { rejectWithValue }) => {
    try {
      const response = await postApi.create(data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchLikePost = createAsyncThunk(
  'post/like',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await postApi.like(id)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchUnLikePost = createAsyncThunk(
  'post/unlike',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await postApi.unlike(id)
      console.log('data....', response.data)
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
