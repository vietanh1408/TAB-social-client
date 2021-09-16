import { Button, Card, Space } from 'antd'
import { useGetAuth } from 'features/auth/hooks'
import React from 'react'
import HeaderAvatar from './layout/Avatar'

const CreatePost = () => {
  const { user } = useGetAuth()
  return (
    <div className="w-full">
      <Card
        title={
          <div className="w-full flex justify-start items-center">
            <HeaderAvatar hasPopover={false} />
            <Button
              className="hover:border-0 rounded-3xl text-left ml-3"
              size="middle"
            >
              Bạn đang nghĩ gì vậy?
            </Button>
          </div>
        }
        bordered={true}
        size="small"
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}

export default CreatePost
