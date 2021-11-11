import { Avatar } from 'antd'
import { useGetAuth } from 'features/user/hooks'
import React from 'react'

interface ChatAvatarsProps {
  avatars: any
}

const ChatAvatars: React.FC<ChatAvatarsProps> = (props: ChatAvatarsProps) => {
  const { avatars } = props
  const { user } = useGetAuth()

  const data = avatars.filter((item: any) => item?._id !== user?._id)

  return (
    <Avatar.Group
      maxCount={3}
      size="large"
      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
    >
      {data.map((item: any) => {
        return <Avatar key={item?._id} src={item?.avatar?.url} />
      })}
    </Avatar.Group>
  )
}

export default ChatAvatars
