import { Divider } from 'antd'
import PostCard from 'components/Post'
import PostSkeleton from 'components/Post/Skeleton'
import CreatePost from 'features/newsFeed/CreatePost'
import React from 'react'
import { useGetPost } from './hooks'

const NewsFeed: React.FC = () => {
  const { post, isLoading } = useGetPost()

  return (
    <div id="news-feed">
      <CreatePost />
      <Divider />
      {isLoading && <PostSkeleton length={1} />}
      {post && post.length > 0
        ? post.map((item: any, index: any) => {
            return <PostCard post={item} key={index} />
          })
        : null}
    </div>
  )
}

export default NewsFeed
