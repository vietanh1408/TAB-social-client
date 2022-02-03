import { AppDispatch, RootState } from 'app/store'
import { CreateMessage } from 'Models'
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllConversations,
  fetchConversationByRoomId,
  fetchCreateMessage,
  getMessages
} from './api'

export const useGetAllConversations = () => {
  const dispatch = useDispatch()

  const { conversations, isLoading } = useSelector(
    (state: RootState) => state.chat
  )

  useEffect(() => {
    dispatch(fetchAllConversations())
  }, [])

  return { conversations, isLoading }
}

export const useGetConversationByRoomId = (roomId: string) => {
  const dispatch = useDispatch()

  const { conversation, isLoading } = useSelector(
    (state: RootState) => state.chat
  )

  useLayoutEffect(() => {
    if (roomId) {
      dispatch(fetchConversationByRoomId(roomId))
    }
  }, [roomId])

  return { conversation, isLoading }
}

export const useCreateMessage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { socketActions } = useSelector((state: RootState) => state.socket)

  const onSendMessage = async (data: CreateMessage) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchCreateMessage(data))
    if (fetchCreateMessage.fulfilled.match(resultAction)) {
      dispatch(getMessages({ ...data, isYour: true }))
      socketActions?.emit('sendMessage', data)
    }
  }

  return [onSendMessage]
}
