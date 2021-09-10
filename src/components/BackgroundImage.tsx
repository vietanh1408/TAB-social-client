import { EditOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import { useGetAuth } from 'features/auth/hooks'
import { useEditProfile } from 'features/profile/hooks'
import { useGetUpload } from 'features/upload/hooks'
import UploadImage from 'features/upload/UploadImage'
import React from 'react'

const BackgroundImage = (props: any) => {
  const { user, token } = useGetAuth()
  const { onEditProfile, profile, isLoading } = useEditProfile()

  const handleUploadAvt = (e: any) => {}

  const isOwnProfile = token && profile?._id === user?._id

  const handleEditBackground = (response: any) => {
    const data = {
      publicId: response?.public_id,
      url: response?.url
    }
    if (response?.success) {
      onEditProfile(profile?._id, { background: data }, token)
    }
  }

  return (
    <div className="profile_bg overflow-hidden">
      <Image
        className="z-0 object-contain h-full"
        src={profile?.background?.url}
      />
      <div className="w-full h-full md:container container mx-auto py-2 md:py-10 px-2 md:px-3 lg:px-4 xl:px-6 flex justify-center md:justify-start items-end z-10">
        <div className="flex flex-col md:flex-row justify-start items-center z-40">
          <div className="profile_avatar">
            <img
              src={profile?.avatar?.url}
              className=" w-full h-full rounded-full overflow-hidden"
              alt="avt"
            />
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
            <p className="profile_name z-40 text-3xl text-white font-bold mb-3">
              {profile?.name}
            </p>
            {isOwnProfile && (
              <UploadImage
                handleSubmit={handleEditBackground}
                isUpdating={isLoading}
                text={'Cập nhật ảnh bìa'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundImage
