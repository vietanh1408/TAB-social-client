// libs
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Popover } from 'antd'
import { BellOutlined } from '@ant-design/icons'
// app
import { AppDispatch, RootState } from 'app/store'
// components
import Avatar from '../Avatar'
import NotificationList from 'features/notification/NotificationList'
// api
import { fetchGetNotification } from 'features/notification/api'

const HeaderRight: React.FC = () => {
  const { notificationCount, notification } = useSelector(
    (state: RootState) => state.notification
  )
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchGetNotification())
  }, [dispatch])

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
          <Avatar />
        </li>
      </ul>
    </div>
  )
}

export default HeaderRight
