// libs
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// interface
import { AppDispatch, RootState } from 'app/store'
// constants
import { CREATE_POST_SUCCESS, DELETE_POST_SUCCESS } from 'constants/message'
// api
import { fetchCreateNotification } from 'features/notification/api'
import {
  fetchCreatePost,
  fetchDeletePost,
  fetchGetAllPost,
  fetchLikePost,
  fetchUnLikePost
} from './api'
// models
import { CreatePostInput, PostType } from 'Models'

export const useGetPost = () => {
  const dispatch: AppDispatch = useDispatch()
  const { post, isLoading } = useSelector((state: RootState) => state.post)
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchGetAllPost())
  }, [dispatch])
  return { post, isLoading }
}

export const useCreatePost = () => {
  const dispatch: AppDispatch = useDispatch()
  const onFetchCreate = async (data: CreatePostInput) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchCreatePost(data))
    if (fetchCreatePost.fulfilled.match(resultAction)) {
      toast.success(CREATE_POST_SUCCESS)
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onFetchCreate]
}

export const useLikePost = () => {
  const dispatch: AppDispatch = useDispatch()

  const { socket, user } = useSelector((state: RootState) => state)
  const { socketActions } = socket

  const onLikePost = async (post: PostType) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchLikePost(post?._id))
    if (fetchLikePost.fulfilled.match(resultAction)) {
      // like post thanh cong => ban socket + ban notification cho chu post
      const notification = {
        text: `${user?.user?.name} đã thích bài viết của bạn`,
        user: user?.user?._id,
        image: post?.image,
        url: `${process.env.REACT_APP_URL}/post/${post?._id}`,
        receivers: post?.user._id
      }
      const result = await dispatch(
        // @ts-ignore
        fetchCreateNotification(notification)
      )
      if (fetchCreateNotification.fulfilled.match(result)) {
        socketActions?.emit('likePost', notification)
      }
    }
  }

  return [onLikePost]
}

export const useUnlikePost = () => {
  const dispatch: AppDispatch = useDispatch()
  const onUnlikePost = async (id: string) => {
    // @ts-ignore
    await dispatch(fetchUnLikePost(id))
  }
  return [onUnlikePost]
}

export const useDeletePost = () => {
  const dispatch: AppDispatch = useDispatch()
  const onDeletePost = async (postId: string) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchDeletePost(postId))
    if (fetchDeletePost.fulfilled.match(resultAction)) {
      toast.success(DELETE_POST_SUCCESS)
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onDeletePost]
}
