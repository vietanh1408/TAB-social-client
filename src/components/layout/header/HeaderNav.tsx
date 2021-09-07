import CustomLink from 'components/CustomLink'
import { menu } from 'routes/routeNav'

const HeaderNav = () => {
  return (
    <div className="header__nav h-full hidden md:block">
      <ul className="w-full h-full flex justify-center items-center px-auto xl:px-6 lg:px-4 md:px-2">
        {menu.map((item: any, index) => (
          <CustomLink to={item.path} key={index}>
            <li className="header__nav__item flex w-full h-full justify-center items-center text-2xl">
              {item.icon.render()}
            </li>
          </CustomLink>
        ))}
      </ul>
    </div>
  )
}

export default HeaderNav
