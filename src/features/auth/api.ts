import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'api/authApi'
import { AuthState, LoginAccount, RegisterAccount } from 'Models'

const initialState: AuthState = {
  token: '',
  user: null,
  error: null,
  isLoading: false
}

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (data: LoginAccount, { rejectWithValue }) => {
    try {
      const { data: response } = await authApi.login(data)
      return response
    } catch (err: any) {
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
        state.error = action.payload.message
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
        state.error = action.payload.message
      })
  }
})

const { reducer } = authSlice
export default reducer
