import React, { useState } from 'react'
import { List, Button, Skeleton, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { UserType } from 'Models'

interface UserCardType {
  user: UserType
  isLoading: boolean
  handleUnFriend: (id: string) => void
  handleSend: (id: string) => void
  handleUnSend: (id: string) => void
}

const UserCard: React.FC<UserCardType> = (props: UserCardType) => {
  const { user, isLoading, handleUnFriend, handleSend, handleUnSend } = props

  const [isFriend, setIsFriend] = useState<boolean>(user.isFriend)
  const [isSend, setIsSend] = useState<boolean>(false)

  const unFriend = (id: string) => {
    setIsFriend(!isFriend)
    handleUnFriend(id)
  }

  const sendFriendRequest = (id: string) => {
    setIsSend(!isSend)
    handleSend(id)
  }

  const unSendFriendRequest = (id: string) => {
    setIsSend(!isSend)
    handleUnSend(id)
  }

  return (
    <List.Item
      actions={[
        isFriend ? (
          <Button onClick={() => unFriend(user?._id)} type={'primary'}>
            Hủy kêt bạn
          </Button>
        ) : isSend ? (
          <Button
            type={'primary'}
            onClick={() => unSendFriendRequest(user?._id)}
          >
            Đã gửi lời mời kết bạn
          </Button>
        ) : (
          <Button onClick={() => sendFriendRequest(user?._id)}>Kết bạn</Button>
        )
      ]}
    >
      <Skeleton avatar title={false} loading={isLoading} active>
        <List.Item.Meta
          avatar={<Avatar src={user?.avatar?.url} size="large" />}
          title={
            <Link to={`/profile/${user?._id}`} className="text-2xl font-bold">
              {user?.name}
            </Link>
          }
        />
      </Skeleton>
    </List.Item>
  )
}

export default UserCard
