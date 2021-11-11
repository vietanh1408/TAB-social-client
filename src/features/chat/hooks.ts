import { RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllConversations, fetchConversationByRoomId } from './api'

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

  useEffect(() => {
    if (roomId) {
      dispatch(fetchConversationByRoomId(roomId))
    }
  }, [roomId])

  return { conversation, isLoading }
}
