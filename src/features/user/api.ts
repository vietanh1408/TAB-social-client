import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import userApi from 'api/userApi'
import { showError } from 'extensions/index'
import {
  UserState,
  LoginAccount,
  LoginGoogle,
  RegisterAccount,
  VerifyEmailInput
} from 'Models'

const initialState: UserState = {
  token: '',
  user: null,
  error: null,
  isLoading: false,
  isVerify: false
}

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: LoginAccount, { rejectWithValue }) => {
    try {
      const { data: response } = await userApi.login(data)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchRegister = createAsyncThunk(
  'user/register',
  async (data: RegisterAccount, { rejectWithValue }) => {
    try {
      const { data: response } = await userApi.register(data)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchVerifyEmail = createAsyncThunk(
  'user/verify-email',
  async (data: VerifyEmailInput, { rejectWithValue }) => {
    try {
      const response = await userApi.verifyEmail(data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchLoginGoogle = createAsyncThunk(
  'user/loginGoogle',
  async (data: LoginGoogle, { rejectWithValue }) => {
    try {
      const { data: response } = await userApi.loginGoogle(data)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchEditProfile = createAsyncThunk(
  'user/editProfile',
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const response = await userApi.editProfile(id, data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchSendFriendRequest = createAsyncThunk(
  'user/sendFriendRequest',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userApi.sendFriendRequest(id)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchAcceptFriendRequest = createAsyncThunk(
  'user/acceptFriendRequest',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userApi.acceptFriendRequest(id)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchUnfriend = createAsyncThunk(
  'user/unfriend',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userApi.unFriend(id)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state: UserState) => {
      state.token = null
      state.user = null
      state.isVerify = false
      localStorage.removeItem('accessToken')
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(
        fetchLogin.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )
      .addCase(
        fetchLogin.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.token = action.payload.accessToken
          state.user = action.payload.user
          localStorage.setItem('accessToken', action.payload.accessToken)
        }
      )
      .addCase(
        fetchLogin.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload?.data?.message
        }
      )
      // register
      .addCase(
        fetchRegister.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )
      .addCase(
        fetchRegister.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.token = action.payload.accessToken
          state.user = action.payload.user
          localStorage.setItem('accessToken', action.payload.accessToken)
        }
      )
      .addCase(
        fetchRegister.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload?.data?.message
        }
      )

      // verify
      .addCase(
        fetchVerifyEmail.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.isVerify = false
        }
      )
      .addCase(
        fetchVerifyEmail.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.isVerify = action.payload.success
          state.user = action.payload.user
        }
      )
      .addCase(
        fetchVerifyEmail.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isVerify = false
        }
      )

      // login with Google
      .addCase(
        fetchLoginGoogle.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )
      .addCase(
        fetchLoginGoogle.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.token = action.payload.accessToken
          state.user = action.payload.user
        }
      )
      .addCase(
        fetchLoginGoogle.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload?.data?.message
        }
      )

      // edit profile
      .addCase(
        fetchEditProfile.pending,
        (state, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )

      .addCase(
        fetchEditProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.user = action.payload.profile
          state.isLoading = false
        }
      )

      .addCase(
        fetchEditProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
        }
      )

      // send Friend request
      .addCase(
        fetchSendFriendRequest.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )
      .addCase(
        fetchSendFriendRequest.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.user = action.payload.user
        }
      )
      .addCase(
        fetchSendFriendRequest.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload?.data?.message
        }
      )

      // accept friend request
      .addCase(
        fetchAcceptFriendRequest.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )
      .addCase(
        fetchAcceptFriendRequest.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.user = action.payload.user
        }
      )
      .addCase(
        fetchAcceptFriendRequest.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload?.data?.message
        }
      )

      // unfriend
      .addCase(
        fetchUnfriend.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = true
        }
      )
      .addCase(
        fetchUnfriend.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.user = action.payload.user
        }
      )
      .addCase(
        fetchUnfriend.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload?.data?.message
        }
      )
  }
})

const { reducer } = userSlice
export const { logout } = userSlice.actions
export default reducer
