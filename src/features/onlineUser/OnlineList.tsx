import { List } from 'antd'
import { RootState } from 'app/store'
import React from 'react'
import { useSelector } from 'react-redux'
import FriendItem from './FriendItem'

const OnlineList: React.FC = () => {
  const { onlineUsers } = useSelector((state: RootState) => state.onlineUser)

  return (
    <List
      itemLayout="horizontal"
      dataSource={onlineUsers}
      renderItem={(item: any) => <FriendItem item={item} />}
    />
  )
}

export default OnlineList
