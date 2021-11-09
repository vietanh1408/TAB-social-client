import { RootState } from 'app/store'
import { useGetAuth } from 'features/user/hooks'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetAllFriend } from './api'

export const useGetAllFriend = () => {
  const { friends, isLoading } = useSelector((state: RootState) => state.friend)
  const { user } = useGetAuth()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGetAllFriend())
  }, [user])

  return { friends, isLoading }
}
