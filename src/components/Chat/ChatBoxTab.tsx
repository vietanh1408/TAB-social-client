import { Badge, PageHeader } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'

interface ChatBoxTab {
  roomId: string
}

const ChatBoxTab: React.FC<ChatBoxTab> = (props: ChatBoxTab) => {
  const { roomId } = props
  console.log(roomId)

  // query get messages by roomId

  return (
    <React.Fragment>
      <PageHeader
        className=" p-0 w-full"
        title={
          <Badge count={0}>
            <Avatar shape="circle" size="large" />
          </Badge>
        }
        subTitle="Đang hoạt động"
      />
    </React.Fragment>
  )
}

export default ChatBoxTab
