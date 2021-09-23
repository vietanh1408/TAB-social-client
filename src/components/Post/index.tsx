import React from 'react'
import { Link } from 'react-router-dom'
import { LikeFilled } from '@ant-design/icons'
import { getTimeDuration } from 'extensions/dateTime'
import { PostType } from 'Models'

type PostCardProps = {
  detail: PostType
}

const PostCard: React.FC<PostCardProps> = ({ detail }) => {
  const commentQuantity = detail?.comments.length
  const likeQuantity = detail?.likes.length
  const time = getTimeDuration(detail?.createdAt)

  return (
    <div className="card mb-4 p-4 border-2 border-gray-400 rounded">
      <div className="card-body">
        <div className="flex justify-start items-center">
          <Link to={`/profile/${detail?.user?._id}`}>
            <img
              src={detail?.user?.avatar?.url}
              className="block ui-w-40 rounded-full"
              alt=""
            />
          </Link>
          <div className="ml-3">
            <Link to={`/profile/${detail?.user?._id}`}>
              <strong>{detail?.user?.name}</strong>
            </Link>
            <div className="small">{time}</div>
          </div>
        </div>
        <p className="py-4">{detail?.description}</p>
        {detail && detail?.image?.url ? (
          <div className="w-full flex justify-center bg-gray-300">
            <img src={detail?.image?.url} alt="post-img" />
          </div>
        ) : null}
      </div>
      <div className="card-footer flex justify-between items-center py-4">
        <div className="flex justify-start items-center text-lg">
          <LikeFilled />
          <strong className="mr-1">{likeQuantity}</strong> Lượt thích
        </div>
        <div className="inline-block text-lg">
          <strong>{commentQuantity}</strong> Bình luận
        </div>
      </div>
    </div>
  )
}

export default PostCard
