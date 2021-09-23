import { useGetAuth } from './../auth/hooks'
import { AppDispatch, RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchCreatePost, fetchGetAllPost } from './api'

export const useGetPost = () => {
  const { token } = useGetAuth()
  const dispatch: AppDispatch = useDispatch()
  const { post, isLoading } = useSelector((state: RootState) => state.post)

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchGetAllPost(token))
  }, [])

  return { post, isLoading }
}

export const useCreatePost = () => {
  const dispatch: AppDispatch = useDispatch()
  const onFetchCreate = async (data: any, token: any) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchCreatePost({ data, token }))
    if (fetchCreatePost.fulfilled.match(resultAction)) {
      toast.success('Đăng bài viết thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onFetchCreate]
}
