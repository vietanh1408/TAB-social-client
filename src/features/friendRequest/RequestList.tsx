import React from 'react'
import { List, Button, Skeleton, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const RequestList: React.FC<any> = (props: any) => {
  const {
    isLoading,
    request,
    handleAcceptFriendRequest,
    handleCancelFriendRequest
  } = props

  const handleAccept = (id: string) => {
    handleAcceptFriendRequest(id)
  }

  const handleCancel = (id: string) => {
    handleCancelFriendRequest(id)
  }

  return (
    <List.Item
      actions={[
        <Button
          className="mr-4"
          type="primary"
          onClick={() => handleAccept(request?._id)}
        >
          Chấp nhận
        </Button>,
        <Button onClick={() => handleCancel(request?._id)}>Hủy</Button>
      ]}
    >
      <Skeleton avatar title={false} loading={isLoading} active>
        <List.Item.Meta
          avatar={<Avatar src={request?.avatar?.url} size="large" />}
          title={
            <Link
              to={`/profile/${request?._id}`}
              className="text-2xl font-bold"
            >
              {request?.name}
            </Link>
          }
        />
      </Skeleton>
    </List.Item>
  )
}

export default RequestList
