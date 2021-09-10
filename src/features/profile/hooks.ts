import { AppDispatch, RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useGetAuth } from './../auth/hooks'
import { fetchEditProfile, fetchProfile } from './api'

export const useLoadProfile = () => {
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

export const useEditProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { profile, isLoading } = useGetProfile()
  const onEditProfile = (id: any, data: any, token: any) => {
    // @ts-ignore
    const resultAction = dispatch(fetchEditProfile({ id, data, token }))
    const isSuccess = fetchEditProfile.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success('Cập nhật thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }

  return { onEditProfile, profile, isLoading }
}

export const useGetProfile = () => {
  return useSelector((state: RootState) => state.profile)
}
