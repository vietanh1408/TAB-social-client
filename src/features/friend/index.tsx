import { List, Typography } from 'antd'
import {
  useCancelSendFriendRequest,
  useSendFriendRequest,
  useUnfriend
} from 'features/user/hooks'
import React from 'react'
import FriendCard from './FriendCard'
import { useGetAllFriend } from './hooks'

const FriendPage: React.FC = () => {
  const { friends, isLoading } = useGetAllFriend()
  const [onUnfriend] = useUnfriend()
  const [onSendFriendRequest] = useSendFriendRequest()
  const [onCancelSendFriendRequest] = useCancelSendFriendRequest()

  const handleUnFriend = (id: string) => {
    onUnfriend(id)
  }

  const handleSend = (id: string) => {
    onSendFriendRequest(id)
  }

  const handleUnSend = (id: string) => {
    onCancelSendFriendRequest(id)
  }

  return (
    <React.Fragment>
      <Typography.Title level={3}>Danh sách bạn bè</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={friends}
        renderItem={(item: any) => (
          <FriendCard
            key={item?._id}
            friend={item}
            isLoading={isLoading}
            handleUnFriend={handleUnFriend}
            handleSend={handleSend}
            handleUnSend={handleUnSend}
          />
        )}
      />
    </React.Fragment>
  )
}

export default FriendPage
