import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import profileApi from 'api/profileApi'
import { showError } from 'extensions'
import { ProfileState } from 'Models'

const initialState: ProfileState = {
  profile: null,
  isLoading: false
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

export const fetchEditProfile = createAsyncThunk(
  'profile/editProfile',
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const response = await profileApi.editProfile(id, data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchSendFriendRequest = createAsyncThunk(
  'profile/sendFriendRequest',
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const response = await profileApi.sendFriendRequest(id)
      console.log('response....', response)
      return response.data
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
      .addCase(fetchProfile.pending, (state, action) => {
        state.isLoading = true
      })

      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.profile = payload.profile
        state.isLoading = false
      })

      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.isLoading = false
      })

      // edit profile
      .addCase(fetchEditProfile.pending, (state, action) => {
        state.isLoading = true
      })

      .addCase(fetchEditProfile.fulfilled, (state, { payload }) => {
        state.profile = payload.profile
        state.isLoading = false
      })

      .addCase(fetchEditProfile.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  }
})

const { reducer } = profileSlice
export default reducer
