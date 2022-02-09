import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import profileApi from 'api/profileApi'
import { showError } from 'extensions'
import { Pagination, ProfileState } from 'Models'
import postApi from '../../api/postApi'

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  posts: [],
  postLength: 0
}

export const fetchProfile = createAsyncThunk(
  'profile/getProfile',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data: response } = await profileApi.getProfile(id)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchGetPostsByProfileId = createAsyncThunk(
  'profile/getPostsByProfileId',
  async ({ id, pagination }: { id: string; pagination?: Pagination }, { rejectWithValue }) => {
    try {
      const { data: response } = await postApi.getPostsByProfileId(id, pagination)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get profile
      .addCase(
        fetchProfile.pending,
        (state: ProfileState, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )

      .addCase(
        fetchProfile.fulfilled,
        (state: ProfileState, action: PayloadAction<any>) => {
          state.profile = action.payload.profile
          state.isLoading = false
        }
      )

      .addCase(
        fetchProfile.rejected,
        (state: ProfileState, action: PayloadAction<any>) => {
          state.isLoading = false
        }
      )

      .addCase(
        fetchGetPostsByProfileId.pending, (state: ProfileState) => {
          state.isLoading = true
        }
      )

      .addCase(
        fetchGetPostsByProfileId.fulfilled, (state: ProfileState, action: PayloadAction<ProfileState>) => {
          state.isLoading = false
          state.postLength = action.payload.postLength
          if (state.posts && state.posts.length > 0 && action.payload.posts.length > 0) {
            state.posts = state.posts.concat(action.payload.posts)
          } else {
            state.posts = action.payload.posts
          }
        }
      )

      .addCase(
        fetchGetPostsByProfileId.rejected, (state: ProfileState) => {
          state.isLoading = false
        }
      )
  }
})

const { reducer } = profileSlice
export default reducer
