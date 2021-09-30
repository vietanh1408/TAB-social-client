import React from 'react'
import { Link } from 'react-router-dom'
import { EllipsisOutlined, LikeFilled } from '@ant-design/icons'
import { getTimeDuration } from 'extensions/dateTime'
import { PostType } from 'Models'
import { useGetAuth } from 'features/user/hooks'
import { Button, Popover } from 'antd'

type PostCardProps = {
  detail: PostType
}

const PostCard: React.FC<PostCardProps> = ({ detail }) => {
  const { user } = useGetAuth()
  const commentQuantity = detail?.comments.length
  const likeQuantity = detail?.likes.length
  const time = getTimeDuration(detail?.createdAt)

  const isOwnPost = user?._id === detail?.user?._id

  const onLike = () => {
    console.log('like post ...')
  }

  return (
    <div className="card mb-4 p-4 border-2 border-gray-400 rounded">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link to={`/profile/${detail?.user?._id}`}>
              <img
                src={detail?.user?.avatar?.url}
                className="block ui-w-40 rounded-full"
                alt="avatar"
              />
            </Link>
            <div className="ml-3">
              <Link to={`/profile/${detail?.user?._id}`}>
                <strong>{detail?.user?.name}</strong>
              </Link>
              <div className="small">{time}</div>
            </div>
          </div>
          {isOwnPost && (
            <Popover
              placement="bottomRight"
              trigger="click"
              content={() => {
                return (
                  <ul>
                    <li>Setting</li>
                  </ul>
                )
              }}
            >
              <EllipsisOutlined className="text-xl" />
            </Popover>
          )}
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
      <div className="flex justify-between items-center">
        <Button onClick={onLike}>Like</Button>
      </div>
    </div>
  )
}

export default PostCard
