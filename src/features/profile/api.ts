import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import profileApi from 'api/profileApi'
import { showError } from 'extensions'
import { Pagination, ProfileState } from 'Models'
import postApi from '../../api/postApi'

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  posts: []
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
  }
})

const { reducer } = profileSlice
export default reducer
