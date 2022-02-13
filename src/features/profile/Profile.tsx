import NotFoundPage from 'components/404Page'
import AddFriend from 'components/AddFriend'
import BackgroundImage from 'components/BackgroundImage'
import LoadingPage from 'components/LoadingPage'
import {
  useAcceptFriendRequest,
  useCancelFriendRequest,
  useCancelSendFriendRequest,
  useGetAuth,
  useSendFriendRequest,
  useUnfriend
} from 'features/user/hooks'
import React from 'react'
import { useLoadProfile } from './hooks'
import Posts from './Posts'

const Profile: React.FC = () => {
  const { profile, isLoading } = useLoadProfile()
  const { user } = useGetAuth()
  const isOtherProfile = profile?._id !== user?._id
  const id = profile?._id

  const [onUnfriend] = useUnfriend()
  const [onSendFriendRequest] = useSendFriendRequest()
  const [onCancelSendFriendRequest] = useCancelSendFriendRequest()
  const [onAccept] = useAcceptFriendRequest()
  const [onCancel] = useCancelFriendRequest()

  const handleSendFriendRequest = () => {
    onSendFriendRequest(profile)
  }

  const handleFollow = () => {
    console.log('following....', id)
  }

  const handleCancelSendFriendRequest = () => {
    onCancelSendFriendRequest(id)
  }

  const handleUnFollow = () => {
    console.log('unfollow....', id)
  }

  const handleUnFriend = () => {
    onUnfriend(id)
  }

  const handleAcceptFriendRequest = () => {
    onAccept(id)
  }

  const handleCancelFriendRequest = () => {
    onCancel(id)
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
          handleUnFriend={handleUnFriend}
          handleFollow={handleFollow}
          handleUnFollow={handleUnFollow}
          handleSendFriendRequest={handleSendFriendRequest}
          handleCancelSendFriendRequest={handleCancelSendFriendRequest}
          handleAcceptFriendRequest={handleAcceptFriendRequest}
          handleCancelFriendRequest={handleCancelFriendRequest}
        />
      ) : null}
      <Posts />
    </div>
  )
}

export default Profile
