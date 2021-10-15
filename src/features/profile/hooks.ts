import { AppDispatch, RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProfile } from './api'

export const useLoadProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { profile, isLoading } = useSelector(
    (state: RootState) => state.profile
  )
  // @ts-ignore
  const { id } = useParams()
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProfile(id))
  }, [id, dispatch])
  return { profile, isLoading }
}

export const useGetProfile = () => {
  return useSelector((state: RootState) => state.profile)
}
