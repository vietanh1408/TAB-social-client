import { List, Pagination } from 'antd'
import PostCard from 'components/Post'
import { PostType } from 'Models'
import React from 'react'

type PostResultType = {
  posts: PostType[]
  totalPost: number
  pageIndex: number
  handleChangePageSize: (page: number, pageSize?: number) => void
}

const PostResult: React.FC<PostResultType> = (props: PostResultType) => {
  const { posts, totalPost, pageIndex, handleChangePageSize } = props

  return (
    <React.Fragment>
      <List
        bordered
        dataSource={posts}
        renderItem={(post: PostType) => <PostCard post={post} />}
      />
      <div className="w-full flex justify-center items-center">
        <Pagination
          current={pageIndex ?? 1}
          total={totalPost}
          hideOnSinglePage
          onChange={handleChangePageSize}
        />
      </div>
    </React.Fragment>
  )
}

export default PostResult
