import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CommentOutlined,
  EllipsisOutlined,
  LikeFilled
} from '@ant-design/icons'
import { getTimeDuration } from 'extensions/dateTime'
import { PostType } from 'Models'
import { useGetAuth } from 'features/user/hooks'
import { Button, Image, Popover } from 'antd'
import { useLikePost, useUnlikePost } from 'features/newsFeed/hooks'
import CommentBox from './CommentBox'

type PostCardProps = {
  detail: PostType
}

const PostCard: React.FC<PostCardProps> = ({ detail }) => {
  const { user } = useGetAuth()
  const checkLiked = detail?.likes.some((id: string) => id === user?._id)
  const isOwnPost = user?._id === detail?.user?._id

  const [onLikePost] = useLikePost()
  const [onUnlikePost] = useUnlikePost()
  const [isLiked, setIsLiked] = useState<boolean>(checkLiked)
  const [openCmt, setOpenCmt] = useState<boolean>(false)

  const handleToggleLike = () => {
    if (detail?._id) {
      if (isLiked) {
        // unlike
        onUnlikePost(detail?._id)
      } else {
        // like
        onLikePost(detail)
      }
    }
    setIsLiked(!isLiked)
  }

  const handleOpenCmt = () => {
    setOpenCmt(!openCmt)
  }

  return (
    <div className="card mb-4 p-4 border-2 border-gray-400 rounded">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link to={`/profile/${detail?.user?._id}`} className="w-10">
              <img
                src={detail?.user?.avatar?.url}
                className="block w-10 h-10 rounded-full object-cover"
                alt="avatar"
              />
            </Link>
            <div className="ml-3">
              <Link to={`/profile/${detail?.user?._id}`}>
                <strong>{detail?.user?.name}</strong>
              </Link>
              <div className="small">{getTimeDuration(detail?.createdAt)}</div>
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
      <div className="card-footer flex justify-start items-center py-4">
        <div className="flex justify-start items-center text-lg mr-4">
          <i className="fas fa-thumbs-up mr-2" />
          {detail?.likes.length}
        </div>
        <div className="flex justify-around items-center text-lg">
          <CommentOutlined className="mr-2" />
          <span>{detail?.comments.length}</span>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <Button className="border-none" onClick={handleToggleLike}>
          {isLiked ? (
            <i className="far fa-thumbs-up text-2xl text-blue-600" />
          ) : (
            <i className="far fa-thumbs-up text-2xl" />
          )}
        </Button>
        <Button className="border-none" onClick={handleOpenCmt}>
          <CommentOutlined className="text-2xl" />
        </Button>
      </div>
      {openCmt && <CommentBox user={user} comments={[]} />}
    </div>
  )
}

export default PostCard
