// libs
import React from 'react'
import { Avatar, Popover } from 'antd'
// components
import SettingList from 'components/SettingList'
// hooks
import { useGetAuth } from 'features/auth/hooks'

const HeaderAvatar = (props: any) => {
  const { hasPopover = true } = props
  const { user } = useGetAuth()
  return (
    <Popover
      placement={'bottomRight'}
      content={
        hasPopover ? <SettingList classList="w-40 hidden md:block" /> : null
      }
      trigger="click"
    >
      <Avatar src={user?.avatar?.url} size="large" className="cursor-pointer" />
    </Popover>
  )
}

export default HeaderAvatar
