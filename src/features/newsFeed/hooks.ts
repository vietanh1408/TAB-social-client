// libs
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// interface
import { AppDispatch, RootState } from 'app/store'
// constants
import {
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  UPDATE_SUCCESS
} from 'constants/message'
// api
import { fetchCreateNotification } from 'features/notification/api'
import {
  fetchCommentPost,
  fetchCreatePost,
  fetchDeletePost,
  fetchEditPost,
  fetchGetAllPost,
  fetchGetCommentByPostId,
  fetchLikePost,
  fetchUnLikePost
} from './api'
// models
import {
  CommentPost,
  CreateOrEditPostInput,
  Pagination,
  PostType
} from 'Models'
import { DEFAULT_PAGE_SIZE } from 'constants/index'

export const useGetPost = () => {
  const dispatch = useDispatch()
  const [pageIndex, setPageIndex] = useState<number>(1)

  const { posts, isLoading, postLength } = useSelector(
    (state: RootState) => state.post
  )

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      if (posts?.length !== postLength) {
        setPageIndex((prev) => prev + 1)
      }
    }
  })

  useEffect(() => {
    if (posts?.length !== postLength) {
      dispatch(fetchGetAllPost({ pageIndex, pageSize: DEFAULT_PAGE_SIZE }))
    }
  }, [dispatch, pageIndex])

  return { posts, isLoading }
}

export const useCreatePost = () => {
  const dispatch: AppDispatch = useDispatch()
  const onFetchCreate = async (data: CreateOrEditPostInput) => {
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

export const useEditPost = () => {
  const dispatch: AppDispatch = useDispatch()
  const onEditPost = async (data: CreateOrEditPostInput) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchEditPost(data))
    if (fetchEditPost.fulfilled.match(resultAction)) {
      toast.success(UPDATE_SUCCESS)
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onEditPost]
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
        sender: user?.user,
        image: post?.image,
        url: `${process.env.REACT_APP_URL}/post/${post?._id}`,
        receivers: post?.user._id,
        isRead: false
      }
      const result = await dispatch(
        // @ts-ignore
        fetchCreateNotification(notification)
      )
      if (fetchCreateNotification.fulfilled.match(result)) {
        const newNotification = result?.payload?.data?.notification
        socketActions?.emit('likePost', newNotification)
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
        sender: user,
        image: data.post?.image,
        url: `${process.env.REACT_APP_URL}/post/${data.postId}`,
        receivers: data.post?.user._id,
        isRead: false
      }
      // @ts-ignore
      const result = await dispatch(fetchCreateNotification(notification))
      if (fetchCreateNotification.fulfilled.match(result)) {
        const newNotification = result?.payload?.data?.notification
        // gui thong bao socket
        socketActions?.emit('commentPost', newNotification)
      }
    }
  }
  return [onCommentPost]
}

export const useGetCommentByPostId = (id: string, pagination: Pagination) => {
  const dispatch = useDispatch()

  const { posts, isLoadingComment } = useSelector(
    (state: RootState) => state.post
  )

  const { pageIndex, pageSize } = pagination ?? {}

  const post = posts.find((item: PostType) => item._id === id)

  const comments: any = post?.comments ?? []

  useEffect(() => {
    dispatch(fetchGetCommentByPostId({ id, pagination }))
  }, [id, pageIndex, pageSize])

  return [comments, isLoadingComment]
}
