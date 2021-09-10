import { AppDispatch, RootState } from 'app/store'
import { useEditProfile } from 'features/profile/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUpload } from './api'

export const useUpload = () => {
  const dispatch: AppDispatch = useDispatch()
  const onUpload = (data: any, token: any) => {
    // @ts-ignore
    const resultUpload = dispatch(fetchUpload({ data, token }))
    if (!fetchUpload.fulfilled.match(resultUpload)) {
      // @ts-ignore
      toast.error(resultUpload.payload?.data?.message)
    }
  }

  return [onUpload]
}

export const useGetUpload = () => {
  return useSelector((state: RootState) => state.upload)
}
