import { showError } from 'extensions/alertNotify'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'api/authApi'
import {
  AuthState,
  LoginAccount,
  RegisterAccount,
  VerifyEmailInput
} from 'Models'

const initialState: AuthState = {
  token: '',
  user: null,
  error: null,
  isLoading: false,
  isVerify: false
}

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (data: LoginAccount, { rejectWithValue }) => {
    try {
      const { data: response } = await authApi.login(data)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (data: RegisterAccount, { rejectWithValue }) => {
    try {
      const { data: response } = await authApi.register(data)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchSendMail = createAsyncThunk(
  'auth/send-mail',
  async ({ email, token }: any, { rejectWithValue }) => {
    try {
      const { data: response } = await authApi.sendMail({ email: email }, token)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchVerifyEmail = createAsyncThunk(
  'auth/verify-email',
  async (
    { data, token }: { data: VerifyEmailInput; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.verifyEmail(data, token)
      return response.data.success
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(fetchLogin.pending, (state: AuthState, { payload }) => {
        state.isLoading = true
      })
      .addCase(fetchLogin.fulfilled, (state: AuthState, action: any) => {
        state.isLoading = false
        state.token = action.payload.accessToken
        state.user = action.payload.user
      })
      .addCase(fetchLogin.rejected, (state: AuthState, action: any) => {
        state.isLoading = false
        state.error = action.payload?.message
      })
      // register
      .addCase(fetchRegister.pending, (state: AuthState, { payload }) => {
        state.isLoading = true
      })
      .addCase(fetchRegister.fulfilled, (state: AuthState, action: any) => {
        state.isLoading = false
        state.token = action.payload.accessToken
        state.user = action.payload.user
      })
      .addCase(fetchRegister.rejected, (state: AuthState, action: any) => {
        state.isLoading = false
        state.error = action.payload?.message
      })

      // verify
      .addCase(fetchVerifyEmail.pending, (state: AuthState, { payload }) => {
        state.isVerify = false
      })
      .addCase(fetchVerifyEmail.fulfilled, (state: AuthState, action: any) => {
        state.isVerify = action.payload
      })
      .addCase(fetchVerifyEmail.rejected, (state: AuthState, action: any) => {
        state.isVerify = false
      })
  }
})

const { reducer } = authSlice
export default reducer
