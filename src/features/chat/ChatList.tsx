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

  console.log('chatList...', chatList)

  return (
    <div className="overflow-auto h-screen">
      <Card bordered={true} bodyStyle={{ background: '000' }}>
        <Tabs tabPosition={'left'}>
          {chatList.map((chat: any) => {
            console.log('chat..........', chat)
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
          {/* <TabPane tab="Tab 1" key="1">
            Content of Tab 1
          </TabPane> */}
        </Tabs>
        {/* <List
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
        /> */}
      </Card>
    </div>
  )
}

export default ChatList
