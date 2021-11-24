import { Avatar, Badge, List } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const FriendItem: React.FC<any> = ({ item, setChatBox }) => {
  return (
    <React.Fragment>
      <List.Item
        className="p-2 border-b-2 border-black"
        onClick={() => setChatBox(item)}
      >
        <List.Item.Meta
          avatar={
            <Badge status="success" dot offset={[0, 30]}>
              <Avatar src={item?.avatar?.url} size="large" />
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
    </React.Fragment>
  )
}

export default FriendItem
