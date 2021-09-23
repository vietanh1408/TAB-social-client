import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { showError } from 'extensions/index'
import authApi from 'api/authApi'
import {
  AuthState,
  LoginAccount,
  LoginGoogle,
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

export const fetchVerifyEmail = createAsyncThunk(
  'auth/verify-email',
  async (data: VerifyEmailInput, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyEmail(data)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchLoginGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async (data: LoginGoogle, { rejectWithValue }) => {
    try {
      const { data: response } = await authApi.loginGoogle(data)
      return response
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.token = null
      state.user = null
      state.isVerify = false
      localStorage.removeItem('accessToken')
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(fetchLogin.pending, (state: AuthState, action: any) => {
        state.isLoading = true
      })
      .addCase(fetchLogin.fulfilled, (state: AuthState, action: any) => {
        state.isLoading = false
        state.token = action.payload.accessToken
        state.user = action.payload.user
        localStorage.setItem('accessToken', action.payload.accessToken)
      })
      .addCase(fetchLogin.rejected, (state: AuthState, action: any) => {
        state.isLoading = false
        state.error = action.payload?.data?.message
      })
      // register
      .addCase(fetchRegister.pending, (state: AuthState, action: any) => {
        state.isLoading = true
      })
      .addCase(fetchRegister.fulfilled, (state: AuthState, action: any) => {
        state.isLoading = false
        state.token = action.payload.accessToken
        state.user = action.payload.user
        localStorage.setItem('accessToken', action.payload.accessToken)
      })
      .addCase(fetchRegister.rejected, (state: AuthState, action: any) => {
        state.isLoading = false
        state.error = action.payload?.data?.message
      })

      // verify
      .addCase(fetchVerifyEmail.pending, (state: AuthState, action: any) => {
        state.isVerify = false
      })
      .addCase(fetchVerifyEmail.fulfilled, (state: AuthState, action: any) => {
        state.isVerify = action.payload.success
        state.user = action.payload.user
      })
      .addCase(fetchVerifyEmail.rejected, (state: AuthState, action: any) => {
        state.isVerify = false
      })

      // login with Google
      .addCase(fetchLoginGoogle.pending, (state: AuthState, action: any) => {
        state.isLoading = true
      })
      .addCase(fetchLoginGoogle.fulfilled, (state: AuthState, action: any) => {
        state.isLoading = false
        state.token = action.payload.accessToken
        state.user = action.payload.user
      })
      .addCase(fetchLoginGoogle.rejected, (state: AuthState, action: any) => {
        state.isLoading = false
        state.error = action.payload?.data?.message
      })
  }
})

const { reducer } = authSlice
export const { logout } = authSlice.actions
export default reducer
