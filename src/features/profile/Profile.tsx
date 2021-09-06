import BackgroundImage from 'components/BackgroundImage'
import LoadingPage from 'components/LoadingPage'
import React from 'react'
import { useGetProfile } from './hooks'

const Profile = () => {
  const { profile, isLoading } = useGetProfile()

  if (isLoading) {
    return <LoadingPage />
  }

  console.log('profile....', profile)

  return (
    <div id="profile_page" style={{ height: '1000px' }}>
      <BackgroundImage />
      <div className="md:container container mx-auto px-2 md:px-64 py-4">
        profile
      </div>
    </div>
  )
}

export default Profile
