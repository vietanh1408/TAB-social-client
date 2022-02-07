// libs
import { Card, Space, Spin, Tabs, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import ChatBoxTab from 'components/Chat/ChatBoxTab'
import { useSearchParams, useUpdateSearch } from 'hook/useSearchParams'
import { ConversationsType } from 'Models'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
// hooks
import { useGetAllConversations } from './hooks'
const { TabPane } = Tabs

const ChatPage: React.FC = () => {
  const { search, pathname } = useLocation()
  const searchParams = useSearchParams(search)
  const [roomId, setRoomId] = useState<string>(searchParams.roomId ?? '')

  const { handleSearchClick } = useUpdateSearch(pathname, search)

  const { conversations, isLoading } = useGetAllConversations()

  const handleChangeRoomChat = (id: string) => {
    setRoomId(id)
    handleSearchClick({ roomId: id })
  }

  return (
    <Card bordered={true} bodyStyle={{ background: 'white' }}>
      <Spin spinning={isLoading}>
        {conversations && conversations.length > 0 && (
          <Tabs
            type="card"
            tabPosition={'left'}
            onChange={(e: string) => handleChangeRoomChat(e)}
          >
            {conversations.map((chat: ConversationsType) => {
              return (
                <TabPane
                  tab={
                    <Meta
                      className=" w-40"
                      avatar={<Avatar src={chat.friend.avatar?.url} />}
                      title={<p className="text-left">{chat.friend.name}</p>}
                      description={
                        <Space align="baseline">
                          <Typography.Text strong>
                            {chat.message.isYour
                              ? 'Bạn'
                              : chat.message.from?.name}
                          </Typography.Text>
                          :
                          <Typography.Paragraph className="truncate text-left">
                            {chat.message.message}
                          </Typography.Paragraph>
                        </Space>
                      }
                    />
                  }
                  key={chat.room._id}
                >
                  <ChatBoxTab
                    roomId={searchParams?.roomId ?? chat.room._id}
                    receiver={chat?.friend?._id}
                  ></ChatBoxTab>
                </TabPane>
              )
            })}
          </Tabs>
        )}
      </Spin>
    </Card>
  )
}

export default ChatPage
