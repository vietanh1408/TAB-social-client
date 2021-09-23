import { Card, Divider } from 'antd'
import PostCard from 'components/Post'
import PostSkeleton from 'components/Post/Skeleton'
import CreatePost from 'features/newsFeed/CreatePost'
import React from 'react'
import { useGetPost } from './hooks'

const NewsFeed: React.FC = () => {
  const { post, isLoading } = useGetPost()

  return (
    <div id="news-feed" style={{ height: '2000px' }}>
      <CreatePost />
      <Divider />
      {isLoading && <PostSkeleton length={1} />}
      {post.map((item: any, index: any) => {
        return <PostCard detail={item} key={index} />
      })}
    </div>
  )
}

export default NewsFeed
