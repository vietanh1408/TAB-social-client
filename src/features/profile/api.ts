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
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const { data: response } = await profileApi.getProfile(id, token)
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
  }
})

const { reducer } = profileSlice
export default reducer
