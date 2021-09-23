import React from 'react'
import Avatar from '../Avatar'

const HeaderRight: React.FC = () => {
  return (
    <div className="header__right h-full">
      <div className="flex justify-end items-center h-full w-full">
        <Avatar />
      </div>
    </div>
  )
}

export default HeaderRight
