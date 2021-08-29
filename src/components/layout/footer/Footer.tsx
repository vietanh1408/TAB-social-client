import React from 'react'
import { HomeOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import CustomLink from 'components/CustomLink'
import { navName } from 'constants/navName'
import { useGetToken } from 'features/auth/hooks'

const Footer = () => {
  const { token } = useGetToken()
  return (
    <>
      {token && (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white">
          <div className="w-full h-full flex justify-center items-center px-auto xl:px-6 lg:px-4 md:px-2">
            <CustomLink to={navName.HOME}>
              <div className="header__nav__item flex w-full h-full justify-center items-center">
                <HomeOutlined className="w-8" />
              </div>
            </CustomLink>
            <CustomLink to={navName.FRIEND}>
              <div className="header__nav__item flex w-full h-full justify-center items-center">
                <TeamOutlined className="w-8" />
              </div>
            </CustomLink>
            <CustomLink to={navName.ADD_FRIEND}>
              <div className="header__nav__item flex w-full h-full justify-center items-center">
                <UserAddOutlined className="w-8" />
              </div>
            </CustomLink>
          </div>
        </footer>
      )}
    </>
  )
}

export default Footer
