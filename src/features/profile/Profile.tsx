import NotFoundPage from 'components/404Page'
import AddFriend from 'components/AddFriend'
import BackgroundImage from 'components/BackgroundImage'
import LoadingPage from 'components/LoadingPage'
import { useGetAuth } from 'features/user/hooks'
import React from 'react'
import { useLoadProfile, useSendFriendRequest } from './hooks'

const Profile: React.FC = () => {
  const { profile, isLoading } = useLoadProfile()
  const { user } = useGetAuth()
  const isOtherProfile = profile?._id !== user?._id
  const id = profile?._id

  const [onSendFriendRequest] = useSendFriendRequest()

  const handleSendFriendRequest = () => {
    onSendFriendRequest(id)
  }

  const handleFollow = () => {
    console.log('following....', id)
  }

  const handleCancelFriendRequest = () => {
    console.log('cancel friend request....', id)
  }

  const handleUnFollow = () => {
    console.log('unfollow....', id)
  }

  const handleUnFriend = () => {
    console.log('unfriend.....', id)
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (!profile) {
    return <NotFoundPage />
  }

  return (
    <div id="profile_page" style={{ height: '1000px' }}>
      <BackgroundImage user={user} />
      {isOtherProfile ? (
        <AddFriend
          user={user}
          profile={profile}
          handleFollow={handleFollow}
          handleUnFriend={handleUnFriend}
          handleSendFriendRequest={handleSendFriendRequest}
          handleUnFollow={handleUnFollow}
          handleCancelFriendRequest={handleCancelFriendRequest}
        />
      ) : null}
      <div className="md:container container mx-auto px-2 md:px-64 py-4 bg-gray-400">
        <div className="add-friend bg-white"></div>
        Profile
      </div>
    </div>
  )
}

export default Profile
