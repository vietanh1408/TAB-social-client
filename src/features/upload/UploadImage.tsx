import { LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Spin } from 'antd'
import { imageType } from 'constants/index'
import { useGetAuth } from 'features/auth/hooks'
import { useRef, useState } from 'react'
import { useGetUpload, useRemoveUpload, useUpload } from './hooks'

const UploadImage = (props: any) => {
  const { handleSubmit, text, isUpdating } = props
  const [previewSource, setPreviewSource] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const btnUpload = useRef(null)
  const input = useRef(null)

  const { token } = useGetAuth()
  const { response, isLoading: isUploading } = useGetUpload()

  const [onUpload] = useUpload()
  const [onRemove] = useRemoveUpload()

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

  const handleSubmitFile = (e: any) => {
    e.preventDefault()
    if (response) {
      handleSubmit(response)
    }
  }

  const uploadImage = async (base46Code: any) => {
    await onUpload({ data: base46Code }, token)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    onRemove({ public_id: response?.public_id }, token)
  }

  const handleSelectFile = () => {
    // @ts-ignore
    input.current.click()
  }

  return (
    <form onSubmit={handleSubmitFile}>
      <input
        type="file"
        onChange={handleFileChange}
        accept={imageType}
        ref={input}
        className="hidden"
      />
      <Button ref={btnUpload} onClick={handleSelectFile}>
        {text}
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleSubmitFile}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            type="primary"
            loading={isUploading || isUpdating}
            onClick={handleSubmitFile}
          >
            Tiếp tục
          </Button>
        ]}
      >
        <Spin
          spinning={isUploading || isUpdating}
          indicator={<LoadingOutlined className="text-2xl" />}
          className="text-center"
        >
          <img src={previewSource} alt="bg-preview" className="m-auto" />
        </Spin>
      </Modal>
    </form>
  )
}

export default UploadImage
