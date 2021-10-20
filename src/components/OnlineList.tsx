import { RootState } from 'app/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Badge, Divider, List } from 'antd'
import { Link } from 'react-router-dom'

const OnlineList: React.FC = () => {
  const { onlineUsers } = useSelector((state: RootState) => state.onlineUser)
  console.log('onlineUser....', onlineUsers)
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={onlineUsers}
        renderItem={(item: any) => (
          <>
            <List.Item className="p-2">
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
                  <Link
                    to={`${process.env.REACT_APP_URL}/profile/${item?._id}`}
                  >
                    <strong>{item?.name}</strong>
                  </Link>
                }
                description="Đang hoạt động"
              />
            </List.Item>
            <Divider />
          </>
        )}
      />
    </div>
  )
}

export default OnlineList
