import React from 'react'
import CustomLink from 'components/CustomLink'
import { menu } from 'routes/routeNav'
import { NavigatorParams } from 'Models'

const Footer: React.FC = () => {
  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white">
      <ul className="w-full h-full flex justify-center items-center px-auto xl:px-6 lg:px-4 md:px-2">
        {menu.map((item: NavigatorParams, index) => (
          <li
            className="header__nav__item flex w-full h-full justify-center items-center text-2xl"
            key={index}
          >
            <CustomLink to={item.path} className="w-full h-full text-center">
              {item.icon.render()}
            </CustomLink>
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default Footer
