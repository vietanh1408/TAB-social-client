import { Avatar, List } from 'antd'
import { getTimeDuration } from 'extensions/dateTime'
import { CommentType } from 'Models'
import React from 'react'

type CommentListProps = {
  comment: Partial<CommentType>
  commentLength?: number
}

const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
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
        description={<p className="text-gray-800">{comment?.content}</p>}
      />
    </List.Item>
  )
}

export default CommentList
