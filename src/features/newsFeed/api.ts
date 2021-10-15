import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import postApi from 'api/postApi'
import { showError } from 'extensions'
import { CommentPost, CreatePostInput } from 'Models'

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
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchDeletePost = createAsyncThunk(
  'post/unlike',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await postApi.delete(postId)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchCommentPost = createAsyncThunk(
  'post/comment',
  async (data: CommentPost, { rejectWithValue }) => {
    try {
      const response = await postApi.comment(data)
      console.log('response...', response.data)
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
      .addCase(fetchGetAllPost.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true
      })

      .addCase(
        fetchGetAllPost.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
          state.post = action.payload.posts
        }
      )

      .addCase(
        fetchGetAllPost.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
        }
      )

      // create post
      .addCase(fetchCreatePost.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true
      })

      .addCase(
        fetchCreatePost.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
          state.post = [action.payload.post, ...state.post]
        }
      )

      .addCase(
        fetchCreatePost.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
        }
      )

      // delete post
      .addCase(
        fetchDeletePost.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.post = state.post.filter((item: any) => {
            return item._id !== action.payload.postId
          })
        }
      )
  }
})

const { reducer } = postSlice

export default reducer
