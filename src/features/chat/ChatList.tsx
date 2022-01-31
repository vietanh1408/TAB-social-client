// libs
import React from 'react'
import { Card, List, Tabs } from 'antd'
import classNames from 'classnames'
// components
import ChatAvatars from 'components/ChatAvatars'
// hooks
import { useGetAuth } from 'features/user/hooks'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
const { TabPane } = Tabs
interface ChatListProps {
  chatList: any
  handleShowMessage: (id: string) => void
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

  console.log('chatList...', chatList)

  return (
    <div className="overflow-auto h-screen">
      <Card bordered={true} bodyStyle={{ background: '000' }}>
        <Tabs tabPosition={'left'}>
          {chatList.map((chat: any) => {
            return (
              <TabPane
                tab={() => {
                  return (
                    <Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  )
                }}
                key={chat._id}
              >
                Content of Tab 1
              </TabPane>
            )
          })}
        </Tabs>
      </Card>
    </div>
  )
}

export default ChatList
