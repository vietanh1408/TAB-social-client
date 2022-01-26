// libs
import React from 'react'
import { List } from 'antd'
import classNames from 'classnames'
// components
import ChatAvatars from 'components/ChatAvatars'
// hooks
import { useGetAuth } from 'features/user/hooks'

interface ChatListProps {
  chatList: any
  handleShowMessage: any
}

const ChatList: React.FC<ChatListProps> = (props: ChatListProps) => {
  const { chatList, handleShowMessage } = props

  const { user } = useGetAuth()

  const onShowMessage = (id: string) => {
    handleShowMessage(id)
  }

  const checkReadMessage = (isRead: boolean, from: string) => {
    const isYou = from === user?._id
    if (isYou) {
      return true
    } else {
      if (isRead) {
        return true
      }
      return false
    }
  }

  return (
    <div className="overflow-auto h-screen">
      <List
        itemLayout="horizontal"
        dataSource={chatList}
        renderItem={(item: any) => (
          <List.Item
            onClick={() => onShowMessage(item?.room?._id)}
            className="cursor-pointer"
          >
            <List.Item.Meta
              avatar={<ChatAvatars avatars={item?.room?.users} />}
              title={item?.room?.name}
              description={
                <p
                  className={`${classNames('truncate', {
                    'font-bold': !checkReadMessage(
                      item?.message?.isRead,
                      item?.message?.from?._id
                    )
                  })}`}
                >
                  {item?.message?.message}
                </p>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default ChatList
