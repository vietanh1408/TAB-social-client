import React, { useRef, useState } from 'react'
import { Button, Modal, Spin } from 'antd'
import LoadingPage from 'components/LoadingPage'
import { imageType } from 'constants/index'
import { useGetUpload, useRemoveUpload, useUpload } from './hooks'

type UploadImageProps = {
  handleSubmit(args: any): void
  text?: any
  isUpdating?: boolean
  classBtn?: string
  title?: string
}

const UploadImage: React.FC<UploadImageProps> = (props: UploadImageProps) => {
  const { handleSubmit, text, isUpdating, classBtn, title } = props
  const [previewSource, setPreviewSource] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const btnUpload = useRef(null)
  const input = useRef(null)

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
    await onUpload({ data: base46Code })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    onRemove({ public_id: response?.public_id })
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
      <Button ref={btnUpload} onClick={handleSelectFile} className={classBtn}>
        {text}
      </Button>
      <Modal
        title={title}
        maskClosable={false}
        visible={isModalVisible}
        closable={isUpdating || isUploading ? false : true}
        onOk={handleSubmitFile}
        onCancel={handleCancel}
        footer={
          isUpdating || isUploading ? null : (
            <>
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>
              <Button type="primary" onClick={handleSubmitFile}>
                Tiếp tục
              </Button>
            </>
          )
        }
      >
        <Spin
          spinning={isUploading || isUpdating}
          indicator={<LoadingPage />}
          className="text-center"
        >
          <img src={previewSource} alt="bg-preview" className="m-auto" />
        </Spin>
      </Modal>
    </form>
  )
}

export default UploadImage
