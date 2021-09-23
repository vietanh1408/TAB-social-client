import React, { useState } from 'react'
import { Button } from 'antd'
import { PlusCircleOutlined, UserAddOutlined } from '@ant-design/icons'
import { ProfileType } from 'Models'

type AddFriendProps = {
  user: any
  profile: ProfileType
  handleFollow: () => void
  handleUnFriend: () => void
  handleAddFriend: () => void
  handleCancelFollow: () => void
  handleCancelFriendRequest: () => void
}

const AddFriend: React.FC<AddFriendProps> = (props: AddFriendProps) => {
  const {
    user,
    profile,
    handleFollow,
    handleUnFriend,
    handleAddFriend,
    handleCancelFollow,
    handleCancelFriendRequest
  } = props

  const friendRequests = user?.friendRequests ?? []
  const followings = user?.followings ?? []

  const alreadySend = friendRequests.some((item: any) => item === profile?._id)
  const alreadyFollow = followings.some((item: any) => item === profile?._id)
  const alreadyFriend = user?.friends.some(
    (friend: any) => friend === profile?._id
  )

  const [isSend, setIsSend] = useState(alreadySend)
  const [isFollowed, setIsFollowed] = useState(alreadyFollow)
  const [isFriend, setIsFriend] = useState(alreadyFriend)

  const handleSend = () => {
    if (isFriend) {
      handleUnFriend()
      setIsFriend(!isFriend)
    } else {
      if (isSend) {
        handleCancelFriendRequest()
      } else {
        handleAddFriend()
      }
      setIsSend(!isSend)
    }
  }

  const handleFollowRequest = () => {
    if (isFollowed) {
      handleCancelFollow()
    } else {
      handleFollow()
    }
    setIsFollowed(!isFollowed)
  }

  return (
    <div className="flex justify-end items-center my-4">
      <Button
        onClick={handleFollowRequest}
        type={`${isFollowed ? 'primary' : 'default'}`}
        className=" mr-4"
      >
        {isFollowed ? (
          'Hủy theo dõi'
        ) : (
          <div className="w-full flex justify-center items-center">
            <PlusCircleOutlined />
            Theo dõi
          </div>
        )}
      </Button>
      <Button
        onClick={handleSend}
        type={`${isSend || isFriend ? 'primary' : 'default'}`}
      >
        {isFriend ? (
          'Hủy kết bạn'
        ) : isSend ? (
          'Đã gửi lời mời kết bạn'
        ) : (
          <div className="w-full flex justify-around items-center">
            <UserAddOutlined />
            Kết bạn
          </div>
        )}
      </Button>
    </div>
  )
}

export default AddFriend
