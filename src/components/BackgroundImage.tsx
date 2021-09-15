import { CameraOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { FALLBACK_IMAGE } from 'constants/index'
import { useGetAuth } from 'features/auth/hooks'
import { useEditProfile } from 'features/profile/hooks'
import { useRemoveUpload } from 'features/upload/hooks'
import UploadImage from 'features/upload/UploadImage'

const BackgroundImage = (props: any) => {
  const { user, token } = useGetAuth()
  const { onEditProfile, profile, isLoading } = useEditProfile()
  const [onRemove] = useRemoveUpload()
  const isOwnProfile = token && profile?._id === user?._id

  const handleEditAvatar = (response: any) => {
    const data = {
      publicId: response?.public_id,
      url: response?.url
    }
    if (response?.success) {
      // edit avatar after upload success
      onEditProfile(profile?._id, { avatar: data }, token)
      // remove old avatar in cloudinary
      if (profile?.avatar?.publicId) {
        onRemove({ public_id: profile?.avatar?.publicId }, token)
      }
    }
  }

  const handleEditBackground = (response: any) => {
    const data = {
      publicId: response?.public_id,
      url: response?.url
    }
    if (response?.success) {
      // edit background after upload success
      onEditProfile(profile?._id, { background: data }, token)
      // remove old background in cloudinary
      if (profile?.background?.publicId) {
        onRemove({ public_id: profile?.background?.publicId }, token)
      }
    }
  }

  return (
    <div className="profile_bg overflow-hidden">
      <Image
        className="z-0 object-contain h-full"
        src={profile?.background?.url}
        fallback={FALLBACK_IMAGE}
      />
      <div className="w-full h-full md:container container mx-auto py-2 md:py-10 px-2 md:px-3 lg:px-4 xl:px-6 flex justify-center md:justify-start items-end z-10">
        <div className="flex flex-col md:flex-row justify-start items-center z-10">
          <div className="relative">
            <Avatar
              src={
                <Image src={profile?.avatar?.url} fallback={FALLBACK_IMAGE} />
              }
              size={150}
              className="cursor-pointer"
            />
            {isOwnProfile && (
              <div className="absolute bottom-0 right-0">
                <UploadImage
                  title="Cập nhật ảnh đại diện"
                  handleSubmit={handleEditAvatar}
                  isUpdating={isLoading}
                  text={<CameraOutlined />}
                  classBtn="rounded-full p-2 flex justify-center items-center"
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
                title="Cập nhật ảnh bìa"
                handleSubmit={handleEditBackground}
                isUpdating={isLoading}
                text={'Cập nhật ảnh bìa'}
                classBtn="rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundImage
