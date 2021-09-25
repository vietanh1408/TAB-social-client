import { AppDispatch, RootState } from 'app/store'
import { fetchEditProfile, fetchSendFriendRequest } from 'features/auth/api'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
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
  }, [id])
  return { profile, isLoading }
}

export const useEditProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { profile, isLoading } = useGetProfile()
  const onEditProfile = async (id: any, data: any) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchEditProfile({ id, data }))
    const isSuccess = fetchEditProfile.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success('Cập nhật thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }

  return { onEditProfile, profile, isLoading }
}

export const useSendFriendRequest = () => {
  const dispatch: AppDispatch = useDispatch()

  const onSendFriendRequest = (id: string | undefined) => {
    // @ts-ignore
    dispatch(fetchSendFriendRequest(id))
  }
  return [onSendFriendRequest]
}

export const useGetProfile = () => {
  return useSelector((state: RootState) => state.profile)
}
