import BackgroundImage from 'components/BackgroundImage'
import React from 'react'

const Profile = () => {
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
