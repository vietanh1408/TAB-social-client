import React from 'react'
import { List, Button, Skeleton, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const RequestList: React.FC<any> = (props: any) => {
  const { isLoading, request } = props
  return (
    <List.Item actions={[]}>
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
