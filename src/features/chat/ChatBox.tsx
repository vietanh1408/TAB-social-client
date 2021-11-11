import React from 'react'
import { useGetConversationByRoomId } from './hooks'

interface ChatBoxProps {}

const ChatBox: React.FC<ChatBoxProps> = (props: ChatBoxProps) => {
  // console.log('conversation.....', conversation)

  return <div className="p-4">Chat BOX</div>
}

export default ChatBox
