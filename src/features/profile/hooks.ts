import { AppDispatch, RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useGetAuth } from './../auth/hooks'
import { fetchProfile } from './api'

export const useGetProfile = () => {
  const { token } = useGetAuth()
  const dispatch: AppDispatch = useDispatch()
  const { profile, isLoading } = useSelector(
    (state: RootState) => state.profile
  )
  // @ts-ignore
  const { id } = useParams()
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProfile({ id, token }))
  }, [id])
  return { profile, isLoading }
}
