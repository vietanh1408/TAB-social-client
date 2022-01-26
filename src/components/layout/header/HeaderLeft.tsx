import { UnorderedListOutlined } from '@ant-design/icons'
import { Drawer, Space } from 'antd'
import Search from 'antd/lib/input/Search'
import Logo from 'assets/logo.png'
import SettingList from 'components/SettingList'
import { useGetAuth } from 'features/user/hooks'
import { useSearchParams, useUpdateSearch } from 'hook/useSearchParams'
import React, { useState } from 'react'
import { useLocation } from 'react-router'

const HeaderLeft: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const { user } = useGetAuth()

  const { search } = useLocation()
  const searchParams = useSearchParams(search)

  const { handleSearchClick } = useUpdateSearch('search', search)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleSearch = (keyword: string) => {
    handleSearchClick({ keyword })
  }

  return (
    <div className="header__left h-full flex items-center">
      <Space align="center" size="large" className="hidden md:flex">
        <img src={Logo} alt="logo" className="logo-icon w-8 h-8" />
        <div className="search-bar w-full h-full flex items-center">
          <Search
            placeholder="Tìm kiếm"
            onSearch={handleSearch}
            size="large"
            defaultValue={searchParams?.keyword}
          />
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
