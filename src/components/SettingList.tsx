import React from 'react'
import { Link } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useLogout } from 'features/auth/hooks'

const SettingList = () => {
  const [onLogout] = useLogout()

  return (
    <ul className="w-40 cursor-pointer">
      <li className="px-3 py-4 hover:bg-gray-300 w-full flex justify-start items-center">
        <UserOutlined />
        <Link to="/profile" className="ml-3">
          Trang cá nhân
        </Link>
      </li>
      <li
        className="px-3 py-4 hover:bg-gray-300 w-full flex justify-start items-center"
        onClick={onLogout}
      >
        <LogoutOutlined />
        <p className="ml-3">Đăng xuât</p>
      </li>
    </ul>
  )
}

export default SettingList
