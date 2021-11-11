import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import chatApi from 'api/chatApi'
import { showError } from 'extensions'

const initialState: any = {
  isLoading: false,
  conversations: [],
  conversation: null,
  error: null
}

export const fetchAllConversations = createAsyncThunk(
  'chat/getAllConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatApi.getAllConversations()
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

export const fetchConversationByRoomId = createAsyncThunk(
  'chat/getConversation',
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await chatApi.getConversation(roomId)
      return response.data
    } catch (err: any) {
      showError(err)
      return rejectWithValue(err.response)
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get all conversation
      .addCase(
        fetchAllConversations.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
          state.conversations = action.payload.conversations
        }
      )

      // get conversation by id
      .addCase(
        fetchConversationByRoomId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
          state.conversation = action.payload.conversation
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith('chat') && action.type.endsWith('pending'),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('chat') && action.type.endsWith('rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload?.data?.message
        }
      )
  }
})

const { reducer } = chatSlice
export default reducer
