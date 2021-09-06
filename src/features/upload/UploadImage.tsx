import { Button } from 'antd'
import uploadApi from 'api/uploadApi'
import { useGetAuth } from 'features/auth/hooks'
import React, { useState } from 'react'

const UploadImage = () => {
  const { token } = useGetAuth()

  const [previewSource, setPreviewSource] = useState('')

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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    getBase64(file)
  }

  const handleSubmitFile = (e: any) => {
    e.preventDefault()
    if (!previewSource) return
    uploadImage(previewSource)
  }

  const uploadImage = async (base46Code: any) => {
    try {
      const response = await uploadApi.upload({ data: base46Code }, token)
      console.log(response)
    } catch (err) {}
  }
  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,video/*"
        />
        <Button htmlType="submit">Upload</Button>
      </form>
    </div>
  )
}

export default UploadImage
