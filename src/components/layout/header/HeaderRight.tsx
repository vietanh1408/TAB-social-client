// libs
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Popover, Switch } from 'antd'
import { BellOutlined } from '@ant-design/icons'
// app
import { RootState } from 'app/store'
// components
import Avatar from '../Avatar'
import NotificationList from 'features/notification/NotificationList'
// api
import { fetchGetNotification } from 'features/notification/api'
import { BooleanType } from 'constants/enum'

const HeaderRight: React.FC = () => {
  const { notificationCount, notification } = useSelector(
    (state: RootState) => state.notification
  )

  const dispatch = useDispatch()

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === BooleanType.True
  )

  const handleToggleDarkMode = (checked: boolean) => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem(
      'darkMode',
      checked ? BooleanType.True : BooleanType.False
    )
  }

  useEffect(() => {
    dispatch(fetchGetNotification())
  }, [dispatch])

  useEffect(() => {
    document
      .getElementsByTagName('html')[0]
      .setAttribute(
        'data-theme',
        localStorage.getItem('darkMode') === BooleanType.True ? 'dark' : 'light'
      )
  }, [isDarkMode])

  return (
    <div className="header__right h-full">
      <ul className="flex justify-end items-center h-full w-full">
        <li className="ml-6">
          <Popover
            placement="bottomRight"
            title={'Thông báo'}
            content={
              <NotificationList
                notificationList={notification}
                classList="w-80 hidden md:block"
              />
            }
            trigger="click"
          >
            <Badge count={notificationCount ?? 0}>
              <BellOutlined className="text-xl cursor-pointer" />
            </Badge>
          </Popover>
        </li>
        <li className="ml-6">
          <Switch
            checked={isDarkMode}
            onChange={handleToggleDarkMode}
            autoFocus
            className="border-0 "
          />
        </li>
        <li className="ml-6">
          <Avatar />
        </li>
      </ul>
    </div>
  )
}

export default HeaderRight
