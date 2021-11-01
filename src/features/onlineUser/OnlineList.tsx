import { Avatar, Badge, List } from 'antd'
import { RootState } from 'app/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OnlineList: React.FC = () => {
  const { onlineUsers } = useSelector((state: RootState) => state.onlineUser)
  return (
    <List
      itemLayout="horizontal"
      dataSource={onlineUsers}
      renderItem={(item: any) => (
        <>
          <List.Item className="p-2 border-b-2 border-black">
            <List.Item.Meta
              avatar={
                <Badge status="success" dot offset={[0, 30]}>
                  <Link
                    to={`${process.env.REACT_APP_URL}/profile/${item?._id}`}
                  >
                    <Avatar src={item?.avatar?.url} size="large" />
                  </Link>
                </Badge>
              }
              title={
                <Link to={`${process.env.REACT_APP_URL}/profile/${item?._id}`}>
                  <strong>{item?.name}</strong>
                </Link>
              }
              description="Đang hoạt động"
            />
          </List.Item>
        </>
      )}
    />
  )
}

export default OnlineList
