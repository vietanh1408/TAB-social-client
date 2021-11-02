// libs
import React, { useEffect, useRef, useState } from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import { PlusOutlined } from '@ant-design/icons'
import Form from 'antd/lib/form/Form'
import { Button, Input, Modal, Space, Spin } from 'antd'
// components
import FormItem from 'components/Form/FormItem'
import LoadingPage from 'components/LoadingPage'
// constants
import { imageType } from 'constants/index'
// others
import { useGetUpload, useRemoveUpload, useUpload } from 'features/upload/hooks'
// models
import { CreateOrEditPostInput, PostType } from 'Models'

interface ModalCreateOrEditPostProps {
  isVisible?: boolean
  setIsVisible?: any
  post?: PostType
  title?: string
  handleSubmitForm: (args: CreateOrEditPostInput) => void
}

const ModalCreateOrEditPost: React.FC<ModalCreateOrEditPostProps> = (
  props: ModalCreateOrEditPostProps
) => {
  const { post, title, isVisible, setIsVisible, handleSubmitForm } = props

  const [previewSource, setPreviewSource] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const btnUpload = useRef(null)
  const input = useRef(null)

  const { response, isLoading: isUploading } = useGetUpload()
  const [onUpload] = useUpload()
  const [onRemove] = useRemoveUpload()

  const formProps = useForm<CreateOrEditPostInput>({
    defaultValues: {
      description: post?.description ?? '',
      image: post?.image ?? { publicId: '', url: '' }
    }
  })

  const { handleSubmit, setValue, reset } = formProps

  const handleCancel = () => {
    setIsVisible(false)
    setPreviewSource('')
    reset()
    if (response) {
      onRemove({ public_id: response?.public_id })
    }
  }

  const onSubmit = (data: CreateOrEditPostInput) => {
    handleSubmitForm(data)
    setIsVisible(false)
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
    setIsVisible(true)
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
    <Modal
      title={title}
      maskClosable={false}
      visible={isVisible}
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
          {(previewSource || post?.image?.url) && (
            <FormItem
              required={false}
              fieldName="image"
              isValidate={false}
              hideLabel={true}
            >
              {({ value }: ControllerRenderProps) => (
                <Spin
                  spinning={isUploading}
                  indicator={<LoadingPage />}
                  className="text-center"
                >
                  <img
                    src={value?.url || previewSource}
                    alt="bg-preview"
                    className="m-auto"
                  />
                </Spin>
              )}
            </FormItem>
          )}
          <React.Fragment>
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
          </React.Fragment>

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
  )
}

export default ModalCreateOrEditPost
