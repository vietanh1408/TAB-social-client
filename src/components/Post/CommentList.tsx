import { Avatar, List } from 'antd'
import { getTimeDuration } from 'extensions/dateTime'
import React from 'react'

const CommentList: React.FC<any> = (props: any) => {
  const { comment } = props
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={comment?.user?.avatar?.url} />}
        title={
          <div className="flex">
            <strong>{comment?.user?.name}</strong>
            <span className="ml-2">{getTimeDuration(comment?.createdAt)}</span>
          </div>
        }
        description={comment?.content}
      />
    </List.Item>
  )
}

export default CommentList
