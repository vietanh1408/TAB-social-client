import React, { useState } from 'react'
import { List, Button, Skeleton, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const FriendCard: React.FC<any> = (props: any) => {
  const { friend, handleUnFriend, isLoading, handleSend, handleUnSend } = props

  const [isFriend, setIsFriend] = useState<boolean>(true)
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
          <Button onClick={() => unFriend(friend?._id)} type={'primary'}>
            Hủy kêt bạn
          </Button>
        ) : isSend ? (
          <Button
            type={'primary'}
            onClick={() => unSendFriendRequest(friend?._id)}
          >
            Đã gửi lời mời kết bạn
          </Button>
        ) : (
          <Button onClick={() => sendFriendRequest(friend?._id)}>
            Kết bạn
          </Button>
        )
      ]}
    >
      <Skeleton avatar title={false} loading={isLoading} active>
        <List.Item.Meta
          avatar={<Avatar src={friend?.avatar?.url} size="large" />}
          title={
            <Link to={`/profile/${friend?._id}`} className="text-2xl font-bold">
              {friend?.name}
            </Link>
          }
        />
      </Skeleton>
    </List.Item>
  )
}

export default FriendCard
