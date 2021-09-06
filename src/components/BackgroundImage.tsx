import React from 'react'
import { Upload, Button } from 'antd'
import { EditOutlined, UploadOutlined } from '@ant-design/icons'
import { useGetAuth } from 'features/auth/hooks'
import { uploadImageApi } from 'features/upload/api'
import UploadImage from 'features/upload/UploadImage'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import Avatar from './layout/Avatar'
import { generateDefaultAvt } from 'extensions'

const BackgroundImage = () => {
  const { user, token } = useGetAuth()
  const { profile } = useSelector((state: RootState) => state.profile)

  const handleUploadAvt = (e: any) => {}

  const handleUploadBackground = (e: any) => {
    const files = e.target.files[0]
    console.log('files....', files)
  }

  const isOwnProfile = token && profile?._id === user?._id

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
            {profile?.avatar ? (
              <img
                src={profile?.avatar}
                className=" w-full h-full rounded-full overflow-hidden"
                alt="avt"
              />
            ) : (
              <div className="default-avatar h-full flex justify-center items-center text-3xl font-bold text-white ">
                <span>{generateDefaultAvt(profile?.name)}</span>
              </div>
            )}
            {isOwnProfile && (
              <div className="upload_avt">
                <EditOutlined
                  className="bg-white z-10 absolute rounded-full overflow-hidden update-avatar"
                  onClick={handleUploadAvt}
                />
              </div>
            )}
          </div>
          <div className="md:ml-6 flex flex-col justify-center items-center md:items-start">
            <p className="profile_name z-40 text-3xl text-white font-bold m-3">
              {profile?.name}
            </p>

            {isOwnProfile && <UploadImage />}

            {isOwnProfile && (
              <Upload
                className="z-50"
                type={'select'}
                name="file"
                id="file"
                multiple={false}
                accept="image/*, video/*"
                onChange={handleUploadBackground}
              >
                <Button icon={<UploadOutlined />}>
                  {profile?.background
                    ? 'Thay đổi ảnh đại diện'
                    : 'Thêm ảnh đại diện'}
                </Button>
              </Upload>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundImage
