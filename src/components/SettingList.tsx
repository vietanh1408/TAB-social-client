import React from 'react'
import { Link } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useLogout } from 'features/auth/hooks'
import { navName } from 'constants/navName'
import { UserState } from 'Models'

type SettingListProps = {
  classList?: any
  onClose?: () => void
  user: UserState | null
}

const SettingList: React.FC<SettingListProps> = (props: SettingListProps) => {
  const { classList, onClose, user } = props

  const [onLogout] = useLogout()

  return (
    <ul className={`cursor-pointer ${classList}`}>
      <Link
        to={`${navName.PROFILE}/${user?._id}`}
        className="px-3 py-4 hover:bg-gray-300 w-full flex justify-start items-center"
        onClick={() => {
          if (onClose) {
            onClose()
          }
        }}
      >
        <UserOutlined />
        <li className="ml-3">Trang cá nhân</li>
      </Link>
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
