import { AppDispatch, RootState } from 'app/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchGetPostsByProfileId, fetchProfile } from './api'
import { fetchGetAllPost } from '../newsFeed/api'
import { DEFAULT_PAGE_SIZE } from '../../constants'

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

export const useGetPostsByProfileId = () => {
  const { posts, isLoading, postLength } = useSelector(
    (state: RootState) => state.profile
  )
  const dispatch = useDispatch()
  const [pageIndex, setPageIndex] = useState<number>(1)

  // @ts-ignore
  const { id } = useParams()

  const hasMorePosts = ({page, limit, total}: {page:number, limit: number, total: number}) => {
    // console.log('hasMorePosts', {page, limit, total})
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (clientHeight + scrollTop >= scrollHeight - 5 && hasMorePosts({page: pageIndex, limit: DEFAULT_PAGE_SIZE, total: postLength ?? 0})) {
      console.log('posts.length.....', posts.length)
      console.log('postLength.....', postLength)
      if(posts.length < postLength) {
        // setPageIndex((prev) => prev + 1)
      }
    }
  }, {
    passive: true
  })

  useEffect(() => {
    dispatch(fetchGetPostsByProfileId({id, pagination: {pageIndex, pageSize: DEFAULT_PAGE_SIZE}}))
  }, [dispatch, pageIndex])

  return { posts,postLength, isLoading }
}