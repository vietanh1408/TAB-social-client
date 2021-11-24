// libs
import React, { useState } from 'react'
import { Col, Row } from 'antd'
// components
import LoadingPage from 'components/LoadingPage'
import ChatBoxList from './ChatBoxList'
import ChatList from './ChatList'
// hooks
import { useGetAllConversations, useGetConversationByRoomId } from './hooks'

const ChatPage: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('')

  const { conversations, isLoading } = useGetAllConversations()

  const { conversation } = useGetConversationByRoomId(roomId)

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Row gutter={6}>
      <Col xs={12} md={10} lg={10}>
        <ChatList
          chatList={conversations}
          handleShowMessage={(id: any) => setRoomId(id)}
        />
      </Col>
      <Col xs={12} md={14} lg={14}>
        <ChatBoxList />
      </Col>
    </Row>
  )
}

export default ChatPage
