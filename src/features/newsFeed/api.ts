import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit'
import postApi from 'api/postApi'
import { showError } from 'extensions'
import {
  CommentPost,
  CreateOrEditPostInput,
  Pagination,
  PostType
} from 'Models'
import * as _ from 'lodash'

interface PostState {
  posts: PostType[]
  isLoading: boolean
  isLoadingComment: boolean
  postLength: number | null
}

const initialState: PostState = {
  posts: [],
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
      .addCase(fetchGetAllPost.pending, (state: PostState) => {
        state.isLoading = true
      })

      .addCase(
        fetchGetAllPost.fulfilled,
        (state: PostState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.postLength = action.payload.postLength
          if (state.posts && state.posts.length > 0) {
            state.posts = state.posts.concat(action.payload.posts)
          } else {
            state.posts = action.payload.posts
          }
        }
      )

      .addCase(fetchGetAllPost.rejected, (state: PostState) => {
        state.isLoading = false
      })

      // create post
      .addCase(fetchCreatePost.pending, (state: PostState) => {
        state.isLoading = true
      })

      .addCase(
        fetchCreatePost.fulfilled,
        (state: PostState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.postLength =
            state.postLength && state.postLength === 0
              ? state.postLength + 1
              : 0
          state.posts = [action.payload.post, ...state.posts]
        }
      )

      .addCase(fetchCreatePost.rejected, (state: PostState) => {
        state.isLoading = false
      })

      .addCase(
        fetchEditPost.fulfilled,
        (state: PostState, action: PayloadAction<any>) => {
          state.posts = state.posts.map((item: any) => {
            if (item._id == action.payload.post._id) {
              return (item = action.payload.post)
            } else {
              return item
            }
          })
        }
      )

      // delete post
      .addCase(
        fetchDeletePost.fulfilled,
        (state: PostState, action: PayloadAction<any>) => {
          state.posts = state.posts.filter((item: any) => {
            return item._id !== action.payload.postId
          })
        }
      )

      // comment a post
      .addCase(fetchCommentPost.pending, (state: PostState) => {
        state.isLoadingComment = true
      })
      .addCase(fetchCommentPost.rejected, (state: PostState) => {
        state.isLoadingComment = false
      })
      .addCase(
        fetchCommentPost.fulfilled,
        (state: PostState, action: PayloadAction<any>) => {
          const currentPost = state.posts.find(
            (item: any) => item._id === action.payload.postId
          )
          if (currentPost) {
            currentPost.comments.unshift(action.payload.comment)
          }
          state.isLoadingComment = false
        }
      )

      // get comment by post id
      .addCase(fetchGetCommentByPostId.pending, (state: PostState) => {
        state.isLoadingComment = true
      })
      .addCase(fetchGetCommentByPostId.rejected, (state: PostState) => {
        state.isLoadingComment = false
      })
      .addCase(
        fetchGetCommentByPostId.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isLoadingComment = false
          const currentPost = state.posts.find(
            (item: PostType) => item._id === action.payload.post._id
          )
          if (current(currentPost)) {
            currentPost.comments = action.payload.post.comments
          }
        }
      )
  }
})

const { reducer } = postSlice

export default reducer
