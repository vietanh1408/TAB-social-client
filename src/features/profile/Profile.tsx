import NotFoundPage from 'components/404Page'
import BackgroundImage from 'components/BackgroundImage'
import LoadingPage from 'components/LoadingPage'
import React from 'react'
import { useLoadProfile } from './hooks'

const Profile = () => {
  const { profile, isLoading } = useLoadProfile()

  if (isLoading) {
    return <LoadingPage />
  }

  if (!profile) {
    return <NotFoundPage />
  }

  return (
    <div id="profile_page" style={{ height: '1000px' }}>
      <BackgroundImage profile={profile} />
      <div className="md:container container mx-auto px-2 md:px-64 py-4 bg-gray-400">
        <div className="add-friend bg-white"></div>
        Profile
      </div>
    </div>
  )
}

export default Profile
