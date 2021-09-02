// libs
import React from 'react'
import { Popover } from 'antd'
// components
import SettingList from 'components/SettingList'
// extensions
import { generateDefaultAvt } from 'extensions'
// hooks
import { useGetAuth } from 'features/auth/hooks'

const Avatar = () => {
  const { user } = useGetAuth()
  return (
    <Popover placement={'bottomRight'} content={SettingList} trigger="click">
      <div className="rounded-full bg-red-300 w-10 h-10 md:w-12 md:h-12 cursor-pointer overflow-hidden">
        {user && user.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <div className="default-avatar h-full flex justify-center items-center text-3xl font-bold text-white ">
            <span>{generateDefaultAvt(user?.name)}</span>
          </div>
        )}
      </div>
    </Popover>
  )
}

export default Avatar
