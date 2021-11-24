import { List } from 'antd'
import { RootState } from 'app/store'
import ChatBox from 'components/Chat/ChatBox'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FriendItem from './FriendItem'

const OnlineList: React.FC = () => {
  const { onlineUsers } = useSelector((state: RootState) => state.onlineUser)

  const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false)

  const [chatBox, setChatBox] = useState(null)

  return (
    <React.Fragment>
      <List
        itemLayout="horizontal"
        dataSource={onlineUsers}
        renderItem={(item: any) => (
          <FriendItem
            item={item}
            isOpenChatBox={isOpenChatBox}
            setIsOpenChatBox={setIsOpenChatBox}
            setChatBox={setChatBox}
          />
        )}
      />
      {chatBox && (
        <ChatBox setIsOpenChatBox={setIsOpenChatBox} friend={chatBox} />
      )}
    </React.Fragment>
  )
}

export default OnlineList
