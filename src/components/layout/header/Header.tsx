import { useGetAuth } from 'features/auth/hooks'
import React from 'react'
import HeaderLeft from './HeaderLeft'
import HeaderNav from './HeaderNav'
import HeaderRight from './HeaderRight'

const Header = () => {
  const { token } = useGetAuth()
  return (
    <>
      {token && (
        <header className="sticky top-0 left-0 right-0 md:h-20 h-14 bg-white shadow-md">
          <div className="md:container container mx-auto h-full w-full py-2 md:py-4 px-2 md:px-3 lg:px-4 xl:px-6">
            <div className="h-full flex justify-around items-center flex-nowrap">
              <HeaderLeft />
              <HeaderNav />
              <HeaderRight />
            </div>
          </div>
        </header>
      )}
    </>
  )
}

export default Header
