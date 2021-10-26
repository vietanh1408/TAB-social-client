import { RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetAllFriend } from './api'

export const useGetAllFriend = () => {
  const { friends, isLoading } = useSelector((state: RootState) => state.friend)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGetAllFriend())
  }, [])

  return { friends, isLoading }
}
