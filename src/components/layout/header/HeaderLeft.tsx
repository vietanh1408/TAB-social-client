import { UnorderedListOutlined } from '@ant-design/icons'
import { Drawer, Space } from 'antd'
import Logo from 'assets/logo.png'
import SearchBar from 'components/Search/SearchBar'
import SettingList from 'components/SettingList'
import { useGetAuth } from 'features/user/hooks'
import React, { useState } from 'react'

const HeaderLeft: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const { user } = useGetAuth()

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <div className="header__left h-full flex items-center">
      <Space align="center" size="large" className="hidden md:flex">
        <img src={Logo} alt="logo" className="logo-icon w-8 h-8" />
        <div className="search-bar w-full h-full flex items-center">
          <SearchBar />
        </div>
      </Space>
      <div className="h-full w-full flex justify-between items-center sm:hidden">
        <UnorderedListOutlined onClick={showDrawer} />
        <Drawer
          title={<img src={Logo} alt="logo" className="logo-icon w-8 h-8" />}
          placement={'left'}
          width={350}
          onClose={onClose}
          visible={visible}
        >
          <SettingList classList="w-full" onClose={onClose} user={user} />
        </Drawer>
      </div>
    </div>
  )
}

export default HeaderLeft
