import { CameraOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { FALLBACK_IMAGE } from 'constants/index'
import { useRemoveUpload } from 'features/upload/hooks'
import UploadImage from 'features/upload/UploadImage'
import { useEditProfile } from 'features/user/hooks'
import { UserType } from 'Models'

type BackgroundImageProps = {
  user: UserType | null
}

const BackgroundImage: React.FC<BackgroundImageProps> = (
  props: BackgroundImageProps
) => {
  const { user } = props
  const { onEditProfile, profile, isLoading } = useEditProfile()
  const [onRemove] = useRemoveUpload()
  const isOwnProfile = profile?._id === user?._id

  const handleEditAvatar = (response: any) => {
    const data = {
      publicId: response?.public_id,
      url: response?.url
    }
    if (response?.success) {
      // edit avatar after upload success
      onEditProfile(profile?._id, { avatar: data })
      // remove old avatar in cloudinary
      if (profile?.avatar?.publicId) {
        onRemove({ public_id: profile?.avatar?.publicId })
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
      onEditProfile(profile?._id, { background: data })
      // remove old background in cloudinary
      if (profile?.background?.publicId) {
        onRemove({ public_id: profile?.background?.publicId })
      }
    }
  }

  return (
    <div className="profile_bg overflow-hidden">
      {isOwnProfile ? (
        <Image
          className="z-0 object-contain h-full"
          src={user?.background?.url}
          fallback={FALLBACK_IMAGE}
        />
      ) : (
        <Image
          className="z-0 object-contain h-full"
          src={profile?.background?.url}
          fallback={FALLBACK_IMAGE}
        />
      )}
      <div className="w-full h-full md:container container mx-auto py-2 md:py-10 px-2 md:px-3 lg:px-4 xl:px-6 flex justify-center md:justify-start items-end">
        <div className="flex flex-col md:flex-row justify-start items-center">
          <div className="relative">
            {isOwnProfile ? (
              <>
                <Avatar
                  src={
                    <Image src={user?.avatar?.url} fallback={FALLBACK_IMAGE} />
                  }
                  size={150}
                  className="cursor-pointer"
                />
                <div className="absolute bottom-0 right-0">
                  <UploadImage
                    title="Cập nhật ảnh đại diện"
                    handleSubmit={handleEditAvatar}
                    isUpdating={isLoading}
                    text={<CameraOutlined />}
                    classBtn="rounded-full p-2 flex justify-center items-center"
                  />
                </div>
              </>
            ) : (
              <Avatar
                src={
                  <Image src={profile?.avatar?.url} fallback={FALLBACK_IMAGE} />
                }
                size={150}
                className="cursor-pointer"
              />
            )}
          </div>
          <div className="md:ml-6 flex flex-col justify-center items-center md:items-start">
            {isOwnProfile ? (
              <>
                <p className="profile_name z-40 text-3xl text-white font-bold mb-3">
                  {user?.name}
                </p>
                <UploadImage
                  title="Cập nhật ảnh bìa"
                  handleSubmit={handleEditBackground}
                  isUpdating={isLoading}
                  text={'Cập nhật ảnh bìa'}
                  classBtn="rounded-md"
                />
              </>
            ) : (
              <p className="profile_name z-40 text-3xl text-white font-bold mb-3">
                {profile?.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundImage
