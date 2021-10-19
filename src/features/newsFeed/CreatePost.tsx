// libs
import React, { useEffect, useRef, useState } from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import {
  CameraOutlined,
  PlusOutlined,
  SmileOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Button, Card, Input, Modal, Space, Spin } from 'antd'
import Form from 'antd/lib/form/Form'
// components
import FormItem from 'components/Form/FormItem'
import LoadingPage from 'components/LoadingPage'
import HeaderAvatar from 'components/layout/Avatar'
// constants
import { imageType } from 'constants/index'
// others
import { useGetUpload, useRemoveUpload, useUpload } from 'features/upload/hooks'
import { CreatePostInput } from 'Models'
import { useCreatePost } from './hooks'

const CreatePost: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [previewSource, setPreviewSource] = useState('')
  const [description, setDescription] = useState('')

  const btnUpload = useRef(null)
  const input = useRef(null)

  const { response, isLoading: isUploading } = useGetUpload()
  const [onUpload] = useUpload()
  const [onRemove] = useRemoveUpload()
  const [onFetchCreate] = useCreatePost()

  const formProps = useForm<CreatePostInput>({
    defaultValues: {
      description: '',
      image: {
        publicId: '',
        url: ''
      }
    }
  })

  const { handleSubmit, setValue, reset } = formProps

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    setPreviewSource('')
    reset()
    if (response) {
      onRemove({ public_id: response?.public_id })
    }
  }

  const onSubmit = (data: CreatePostInput) => {
    onFetchCreate(data)
    setIsModalVisible(false)
    reset()
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // @ts-ignore
        setPreviewSource(reader.result)
        resolve(reader.result)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]
    const base64Code = await getBase64(file)
    setIsModalVisible(true)
    if (!base64Code) return
    uploadImage(base64Code)
  }

  const uploadImage = async (base46Code: any) => {
    await onUpload({ data: base46Code })
    if (response) {
      onRemove({ public_id: response?.public_id })
    }
  }

  const handleSelectFile = () => {
    // @ts-ignore
    input.current.click()
  }

  useEffect(() => {
    if (response) {
      const image = {
        publicId: response.public_id,
        url: response.url
      }
      setValue('image', image)
    }
  }, [response, setValue])

  return (
    <div className="w-full">
      <Card
        title={
          <div className="w-full flex justify-start items-center">
            <HeaderAvatar hasPopover={false} />
            <Button
              className="hover:border-0 rounded-3xl text-left ml-3"
              size="middle"
              onClick={handleOpenModal}
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
          onClick={handleOpenModal}
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
      <Modal
        title="Tạo bài viết"
        maskClosable={false}
        visible={isModalVisible}
        closable={!isUploading}
        footer={null}
        onCancel={handleCancel}
      >
        <FormProvider {...formProps}>
          <Form onFinish={handleSubmit(onSubmit)}>
            {/* Description */}
            <FormItem
              required={false}
              fieldName="description"
              isValidate={true}
              hideLabel={true}
            >
              {({ onChange, onBlur, value }: ControllerRenderProps) => (
                <Input
                  className="ant-input-affix-wrapper-lg custom__input"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e: any) => {
                    onChange(e.target.value)
                    setDescription(e.target.value)
                  }}
                  placeholder={'Bạn đang nghĩ gì vậy ?'}
                  bordered={false}
                />
              )}
            </FormItem>
            {/* End Description */}

            {/* Image */}
            {previewSource && (
              <Spin
                spinning={isUploading}
                indicator={<LoadingPage />}
                className="text-center"
              >
                <img src={previewSource} alt="bg-preview" className="m-auto" />
              </Spin>
            )}

            <FormItem
              required={false}
              fieldName="image"
              isValidate={false}
              hideLabel={true}
            >
              {({ onChange, onBlur, value }: ControllerRenderProps) => (
                <>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept={imageType}
                    ref={input}
                    style={{ display: 'none' }}
                  />
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    size="large"
                    className="w-full mt-4"
                    ref={btnUpload}
                    onClick={handleSelectFile}
                    loading={isUploading}
                  >
                    Thêm ảnh / video
                  </Button>
                </>
              )}
            </FormItem>

            {/* End Image */}
            <Space className="w-full flex justify-end items-center mt-4">
              <Button
                htmlType="button"
                loading={isUploading}
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={isUploading}
                disabled={!(previewSource || description)}
              >
                Đăng
              </Button>
            </Space>
          </Form>
        </FormProvider>
      </Modal>
    </div>
  )
}

export default CreatePost
