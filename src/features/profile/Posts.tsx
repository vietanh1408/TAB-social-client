import { Button } from 'antd'
import postApi from 'api/postApi'
import PostCard from 'components/Post'
import { DEFAULT_PAGE_SIZE } from 'constants/index'
import { updatePosts } from 'features/newsFeed/api'
import { PostType } from 'Models'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

const Posts: React.FC = () => {
  // @ts-ignore
  const { id } = useParams()
  const dispatch = useDispatch()

  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const [posts, setPosts] = useState<PostType[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true)

  const handleLoadMore = () => {
    if (showLoadMore) {
      setPageIndex((prev) => prev + 1)
    }
  }

  useLayoutEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      await postApi
        .getPostsByProfileId(id, { pageIndex, pageSize })
        .then((res) => {
          return res.data
        })
        .then((data) => {
          setLoading(false)

          setPosts((prev) => {
            return [...prev, ...data.posts]
          })

          setTotal(data.total)

          if (data.total === 0 || data.posts.length === 0) {
            setShowLoadMore(false)
          }

          return data
        })
    }
    fetchApi()
  }, [id, pageSize, pageIndex])

  useEffect(() => {
    // update post state
    dispatch(updatePosts({ posts, postLength: total }))
  }, [posts])

  return (
    <div className="w-full py-4" id="post-list">
      {posts && posts.length > 0
        ? posts.map((item: any, index: number) => {
            return <PostCard post={item} key={index} />
          })
        : null}
      {showLoadMore && (
        <div className="w-full flex justify-center align-middle">
          <Button type="primary" loading={loading} onClick={handleLoadMore}>
            Tải thêm
          </Button>
        </div>
      )}
    </div>
  )
}

export default Posts
