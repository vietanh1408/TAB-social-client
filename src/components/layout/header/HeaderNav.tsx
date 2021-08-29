import { HomeOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import CustomLink from 'components/CustomLink'
import { navName } from 'constants/navName'

const HeaderNav = () => {
  return (
    <div className="header__nav h-full hidden md:block">
      <div className="w-full h-full flex justify-center items-center px-auto xl:px-6 lg:px-4 md:px-2">
        <CustomLink to={navName.HOME}>
          <div className="header__nav__item flex w-full h-full justify-center items-center text-2xl">
            <HomeOutlined />
          </div>
        </CustomLink>
        <CustomLink to={navName.FRIEND}>
          <div className="header__nav__item flex w-full h-full justify-center items-center text-2xl">
            <TeamOutlined />
          </div>
        </CustomLink>
        <CustomLink to={navName.ADD_FRIEND}>
          <div className="header__nav__item flex w-full h-full justify-center items-center text-2xl">
            <UserAddOutlined />
          </div>
        </CustomLink>
      </div>
    </div>
  )
}

export default HeaderNav
