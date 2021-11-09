import { RootState } from 'app/store'
import { fetchGetRequests } from 'features/friend/api'
import { useGetAuth } from 'features/user/hooks'
import { Pagination } from 'Models'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useGetRequests = (pagination: Pagination | undefined) => {
  const { requests, isLoadingRequests, totalRequests } = useSelector(
    (state: RootState) => state.friend
  )
  const { user } = useGetAuth()

  const dispatch = useDispatch()

  const { pageSize, pageIndex } = pagination ?? {}

  useEffect(() => {
    dispatch(fetchGetRequests(pagination))
  }, [pageSize, pageIndex, user])

  return { requests, isLoadingRequests, totalRequests }
}
