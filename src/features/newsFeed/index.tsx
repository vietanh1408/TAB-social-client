import { Divider } from 'antd'
import PostCard from 'components/Post'
import PostSkeleton from 'components/Post/Skeleton'
import CreatePost from 'features/newsFeed/CreatePost'
import React, { useEffect, useState } from 'react'
import { useGetPost } from './hooks'

const NewsFeed: React.FC = () => {
  const [loadMore, setLoadMore] = useState(true)

  const { post, isLoading } = useGetPost()

  useEffect(() => {
    // getData(loadMore);
    setLoadMore(false)
  }, [loadMore])

  useEffect(() => {
    const listPost = document.getElementById('list-post')
    // if(list.clientHeight <= window.innerHeight && list.clientHeight) {
    //   setLoadMore(true);
    // }
    window.addEventListener('scroll', () =>
      console.log(
        'listPost...',
        listPost?.clientHeight,
        'window...',
        window.innerHeight
      )
    )
    return () => {
      window.removeEventListener('scroll', () => console.log('load more 2...'))
    }
  }, [])

  return (
    <div id="news-feed">
      <CreatePost />
      <Divider />
      {isLoading && <PostSkeleton length={1} />}
      <div id="list-post">
        {post && post.length > 0
          ? post.map((item: any, index: any) => {
              return <PostCard post={item} key={index} />
            })
          : null}
      </div>
    </div>
  )
}

export default NewsFeed
