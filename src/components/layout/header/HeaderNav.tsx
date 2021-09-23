import React from 'react'
import CustomLink from 'components/CustomLink'
import { menu } from 'routes/routeNav'

const HeaderNav: React.FC = () => {
  return (
    <ul className="header__nav hidden w-full h-full md:flex justify-center items-center px-auto xl:px-6 lg:px-4 md:px-2">
      {menu.map((item: any, index) => (
        <li
          className="header__nav__item flex w-full h-full justify-center items-center text-2xl xl:mx-10 mx-0"
          key={index}
        >
          <CustomLink to={item.path} className="w-full h-full text-center">
            {item.icon.render()}
          </CustomLink>
        </li>
      ))}
    </ul>
  )
}

export default HeaderNav
