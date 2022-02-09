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
import { useGetPostsByProfileId, useLoadProfile } from './hooks'
import PostSkeleton from '../../components/Post/Skeleton'
import PostCard from '../../components/Post'
import {PostType} from 'Models'

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
  const {posts, postLength, isLoading: loadingPosts} = useGetPostsByProfileId()

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
      <div className="w-full py-4">
        {isLoading && <PostSkeleton length={1} />}
        {posts && posts.length > 0
          ? posts.map((item: any, index: number) => {
            return <PostCard post={item} key={index} />
          })
          : null}
        </div>
    </div>
  )
}

export default Profile
