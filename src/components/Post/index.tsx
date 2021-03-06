import { CommentOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import ModalCreateOrEditPost from 'components/Modal/ModalCreateOrEditPost'
import { getTimeDuration } from 'extensions/dateTime'
import {
  useCommentPost,
  useDeletePost,
  useEditPost,
  useLikePost,
  useUnlikePost
} from 'features/newsFeed/hooks'
import { useGetAuth } from 'features/user/hooks'
import { CommentPost, CreateOrEditPostInput, PostType } from 'Models'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CommentBox from './CommentBox'

type PostCardProps = {
  post: PostType
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useGetAuth()

  const [onLikePost] = useLikePost()
  const [onUnlikePost] = useUnlikePost()
  const [onDeletePost] = useDeletePost()
  const [onCommentPost] = useCommentPost()
  const [onEditPost] = useEditPost()
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked ?? false)
  const [openCmt, setOpenCmt] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [likeNumb, setLikeNumb] = useState<number>(post?.likeLength ?? 0)
  const [commentLength, setCommentLength] = useState<number>(
    post?.commentLength ?? 0
  )

  const handleToggleLike = () => {
    if (post?._id) {
      if (isLiked) {
        // unlike
        onUnlikePost(post?._id)
        setLikeNumb((prev) => prev - 1)
      } else {
        // like
        onLikePost(post)
        setLikeNumb((prev) => prev + 1)
      }
    }
    setIsLiked(!isLiked)
  }

  const handleOpenCmt = () => {
    setOpenCmt(true)
  }

  const handleDeletePost = () => {
    onDeletePost(post?._id)
  }

  const handleCommentPost = (data: CommentPost) => {
    onCommentPost(data)
    setCommentLength((prev) => prev + 1)
  }

  const handleEditPost = (data: CreateOrEditPostInput) => {
    data.id = post?._id
    onEditPost(data)
  }

  return (
    <React.Fragment>
      <div className="card mb-4 p-4 border-2 border-gray-200 rounded">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
              <Link to={`/profile/${post?.user?._id}`} className="w-10">
                <img
                  src={post?.user?.avatar?.url}
                  className="block w-10 h-10 rounded-full object-cover"
                  alt="avatar"
                />
              </Link>
              <div className="ml-3">
                <Link to={`/profile/${post?.user?._id}`}>
                  <strong>{post?.user?.name}</strong>
                </Link>
                <div className="small">{getTimeDuration(post?.createdAt)}</div>
              </div>
            </div>
            {post.isYour && (
              <Popover
                placement="bottomRight"
                trigger="click"
                content={() => {
                  return (
                    <ul>
                      <li
                        className="post-setting "
                        onClick={() => setIsVisible(true)}
                      >
                        Ch???nh s???a b??i vi???t
                      </li>
                      <li className="post-setting" onClick={handleDeletePost}>
                        X??a b??i vi???t
                      </li>
                    </ul>
                  )
                }}
              >
                <EllipsisOutlined className="text-xl" />
              </Popover>
            )}
          </div>
          <p className="py-4">{post?.description}</p>
          {post && post?.image?.url ? (
            <div className="w-full flex justify-center bg-gray-300">
              <img src={post?.image?.url} alt="post-img" />
            </div>
          ) : null}
        </div>
        <div className="card-footer flex justify-start items-center py-4">
          <div className="flex justify-start items-center text-lg mr-4">
            <i className="fas fa-thumbs-up mr-2" />
            {likeNumb}
          </div>
          <div className="flex justify-around items-center text-lg">
            <CommentOutlined className="mr-2" />
            <span>{commentLength}</span>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <Button className="border-none custom-btn" onClick={handleToggleLike}>
            {isLiked ? (
              <i className="far fa-thumbs-up text-2xl text-blue-600" />
            ) : (
              <i className="far fa-thumbs-up text-2xl" />
            )}
          </Button>
          <Button className="border-none custom-btn" onClick={handleOpenCmt}>
            <CommentOutlined className="text-2xl" />
          </Button>
        </div>
        {openCmt && (
          <CommentBox
            post={post}
            user={user}
            handleComment={handleCommentPost}
          />
        )}
      </div>
      <ModalCreateOrEditPost
        post={post}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleSubmitForm={handleEditPost}
      />
    </React.Fragment>
  )
}

export default PostCard
