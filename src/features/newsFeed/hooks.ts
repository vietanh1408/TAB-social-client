// libs
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// interface
import { AppDispatch, RootState } from 'app/store'
// constants
import { CREATE_POST_SUCCESS, DELETE_POST_SUCCESS } from 'constants/message'
// api
import { fetchCreateNotification } from 'features/notification/api'
import {
  fetchCommentPost,
  fetchCreatePost,
  fetchDeletePost,
  fetchGetAllPost,
  fetchGetCommentByPostId,
  fetchLikePost,
  fetchUnLikePost
} from './api'
// models
import { CommentPost, CreatePostInput, Pagination, PostType } from 'Models'
import { DEFAULT_PAGE_SIZE } from 'constants/index'

export const useGetPost = () => {
  const dispatch = useDispatch()
  const [pageIndex, setPageIndex] = useState<number>(1)

  const { post, isLoading, postLength } = useSelector(
    (state: RootState) => state.post
  )

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      if (post?.length !== postLength) {
        setPageIndex((prev) => prev + 1)
      }
    }
  })

  useEffect(() => {
    if (post?.length !== postLength) {
      dispatch(fetchGetAllPost({ pageIndex, pageSize: DEFAULT_PAGE_SIZE }))
    }
  }, [dispatch, pageIndex])

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

export const useCommentPost = () => {
  const dispatch: AppDispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const { socketActions } = useSelector((state: RootState) => state.socket)
  const onCommentPost = async (data: CommentPost) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchCommentPost(data))
    if (fetchCommentPost.fulfilled.match(resultAction)) {
      // gui thong bao
      const notification = {
        text: `${user?.name} đã bình luận bài viết của bạn`,
        user: user?._id,
        image: data.post?.image,
        url: `${process.env.REACT_APP_URL}/post/${data.postId}`,
        receivers: data.post?.user._id
      }
      // @ts-ignore
      const result = await dispatch(fetchCreateNotification(notification))
      if (fetchCreateNotification.fulfilled.match(result)) {
        // gui thong bao socket
        socketActions?.emit('commentPost', notification)
      }
    }
  }
  return [onCommentPost]
}

export const useGetCommentByPostId = (id: string, pagination: Pagination) => {
  const dispatch: AppDispatch = useDispatch()

  const { post, isLoadingComment } = useSelector(
    (state: RootState) => state.post
  )

  const { pageIndex, pageSize } = pagination ?? {}

  const { comments = [] } = post.find((item: any) => item._id === id)

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchGetCommentByPostId({ id, pagination }))
  }, [id, pageIndex, pageSize])

  return [comments, isLoadingComment]
}
