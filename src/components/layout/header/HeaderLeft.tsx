import { UnorderedListOutlined } from '@ant-design/icons'
import { Drawer, Space } from 'antd'
import Search from 'antd/lib/input/Search'
import Logo from 'assets/logo.png'
import SettingList from 'components/SettingList'
import React, { useState } from 'react'

const HeaderLeft: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleSearch = (value: any) => {
    console.log('value...', value)
  }

  return (
    <div className="header__left h-full flex items-center">
      <Space align="center" size="large" className="hidden md:flex">
        <img src={Logo} alt="logo" className="logo-icon w-8 h-8" />
        <div className="search-bar w-full h-full flex items-center">
          <Search placeholder="Tìm kiếm" onSearch={handleSearch} size="large" />
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
          <SettingList classList="w-full" onClose={onClose} />
        </Drawer>
      </div>
    </div>
  )
}

export default HeaderLeft
