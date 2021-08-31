import { generateDefaultAvt } from 'extensions'
import { useGetAuth } from 'features/auth/hooks'
import React from 'react'

const HeaderRight = () => {
  const { user } = useGetAuth()

  return (
    <div className="header__right h-full border-2 border-black border-opacity-50 ">
      <div className="flex justify-end items-center h-full w-full">
        <div className="rounded-full h-full bg-red-300 w-12">
          {user && user.avatar ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <div className="default-avatar h-full flex justify-center items-center text-3xl font-bold text-white ">
              <span>{generateDefaultAvt(user?.name)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderRight
