import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import postApi from 'api/postApi'
import { showError } from 'extensions'
import { CommentPost, CreateOrEditPostInput, Pagination } from 'Models'

const initialState: any = {
  post: [],
  isLoading: false,
  isLoadingComment: false,
  postLength: null
}

export const fetchGetAllPost = createAsyncThunk(
  'post/getAllPost',
  async (pagination: Pagination | undefined, { rejectWithValue }) => {
    try {
      const response = await postApi.get(pagination)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchCreatePost = createAsyncThunk(
  'post/createPost',
  async (data: CreateOrEditPostInput, { rejectWithValue }) => {
    try {
      const response = await postApi.create(data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchEditPost = createAsyncThunk(
  'post/editPost',
  async (data: CreateOrEditPostInput, { rejectWithValue }) => {
    try {
      const response = await postApi.edit(data)
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
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchGetCommentByPostId = createAsyncThunk(
  'post/getCommentByPostId',
  async (
    { id, pagination }: { id: string; pagination: Pagination },
    { rejectWithValue }
  ) => {
    try {
      const response = await postApi.getComment(id, pagination)
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
          state.postLength = action.payload.postLength
          if (state.post && state.post.length > 0) {
            state.post = state.post.concat(action.payload.posts)
          } else {
            state.post = action.payload.posts
          }
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
          state.postLength = state.postLength + 1
          state.post = [action.payload.post, ...state.post]
        }
      )

      .addCase(
        fetchCreatePost.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
        }
      )

      .addCase(fetchEditPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.post = state.post.map((item: any) => {
          if (item._id == action.payload.post._id) {
            return (item = action.payload.post)
          } else {
            return item
          }
        })
      })

      // delete post
      .addCase(
        fetchDeletePost.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.post = state.post.filter((item: any) => {
            return item._id !== action.payload.postId
          })
        }
      )

      // comment a post
      .addCase(
        fetchCommentPost.pending,
        (state: any, action: PayloadAction<any>) => {
          state.isLoadingComment = true
        }
      )
      .addCase(
        fetchCommentPost.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.isLoadingComment = false
        }
      )
      .addCase(
        fetchCommentPost.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          const currentPost = state.post.find(
            (item: any) => item._id === action.payload.postId
          )
          if (currentPost) {
            currentPost.comments.unshift(action.payload.comment)
          }
          state.isLoadingComment = false
        }
      )

      // get comment by post id
      .addCase(
        fetchGetCommentByPostId.pending,
        (state: any, action: PayloadAction<any>) => {
          state.isLoadingComment = true
        }
      )
      .addCase(
        fetchGetCommentByPostId.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.isLoadingComment = false
        }
      )
      .addCase(
        fetchGetCommentByPostId.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isLoadingComment = false
          const currentPost = state.post.find(
            (item: any) => item._id === action.payload.postId
          )
          if (currentPost) {
            if (
              Array.isArray(currentPost?.comments) &&
              currentPost?.comments?.length > 0
            ) {
              currentPost.comments = currentPost.comments.concat(
                action.payload.comments
              )
            } else {
              currentPost.comments = action.payload.comments
            }
          }
        }
      )
  }
})

const { reducer } = postSlice

export default reducer
