import React from 'react'
import { Upload, Button } from 'antd'
import { EditOutlined, UploadOutlined } from '@ant-design/icons'
import { useGetAuth } from 'features/auth/hooks'

const BackgroundImage = () => {
  const { user } = useGetAuth()

  const handleUploadAvt = () => {
    console.log('upload...')
  }

  return (
    <div className="profile_bg overflow-hidden">
      <img
        className="absolute w-full h-full object-cover"
        src="https://scontent-hkt1-1.xx.fbcdn.net/v/t1.6435-9/36779307_1242878312552393_5097897061026627584_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=19026a&_nc_ohc=A04GZcv92p0AX86kpd2&_nc_ht=scontent-hkt1-1.xx&oh=75f1352ca36d99e200743f4326f8217f&oe=61556A22"
        alt="bg"
      />
      <div className="w-full h-full md:container container mx-auto py-2 md:py-10 px-2 md:px-3 lg:px-4 xl:px-6 flex justify-center md:justify-start items-end">
        <div className="flex flex-col md:flex-row justify-start items-center z-40">
          <div className="profile_avatar">
            <img
              src={user?.avatar}
              className=" w-full h-full rounded-full overflow-hidden"
              alt="avt"
            />
            <Upload className="z-50">
              <EditOutlined
                className="bg-white z-10 absolute rounded-full overflow-hidden update-avatar"
                onClick={handleUploadAvt}
              />
            </Upload>
          </div>
          <div className="md:ml-6 flex flex-col justify-center items-center md:items-start">
            <p className="profile_name z-40 text-3xl text-white font-bold m-3">
              {user?.name}
            </p>

            <Upload className="z-50">
              <Button icon={<UploadOutlined />}>
                {user?.background
                  ? 'Thay đổi ảnh đại diện'
                  : 'Thêm ảnh đại diện'}
              </Button>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundImage
