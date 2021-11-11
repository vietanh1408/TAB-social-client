// libs
import React, { useState } from 'react'
import {
  CameraOutlined,
  SmileOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Button, Card } from 'antd'
// components
import HeaderAvatar from 'components/layout/Avatar'
import ModalCreateOrEditPost from 'components/Modal/ModalCreateOrEditPost'
// models
import { CreateOrEditPostInput } from 'Models'
// hooks
import { useCreatePost } from './hooks'

const CreatePost: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [onFetchCreate] = useCreatePost()
  const handleCreatePost = (data: CreateOrEditPostInput) => {
    onFetchCreate(data)
  }

  return (
    <div className="w-full">
      <Card
        title={
          <div className="w-full flex justify-start items-center">
            <HeaderAvatar hasPopover={false} />
            <Button
              className="custom-btn hover:border-0 rounded-3xl text-left ml-3"
              size="middle"
              onClick={() => setIsVisible(true)}
            >
              Bạn đang nghĩ gì vậy?
            </Button>
          </div>
        }
        bordered={true}
        size="small"
      >
        <ul
          className="flex justify-around items-center"
          onClick={() => setIsVisible(true)}
        >
          <li className="text-2xl cursor-pointer hover:border-indigo-300">
            <VideoCameraOutlined />
          </li>
          <li className="text-2xl cursor-pointer hover:border-indigo-300">
            <CameraOutlined />
          </li>
          <li className="text-2xl cursor-pointer hover:border-indigo-300">
            <SmileOutlined />
          </li>
        </ul>
      </Card>
      <ModalCreateOrEditPost
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleSubmitForm={handleCreatePost}
      />
    </div>
  )
}

export default CreatePost
