import Search from 'antd/lib/input/Search'
import React from 'react'

const HeaderLeft = () => {
  const handleSearch = (value: any) => {
    console.log('value...', value)
  }

  return (
    <div className="header__left h-full">
      <div className="h-full w-full justify-between items-center sm:flex hidden">
        <div className="logo-icon">LOGO</div>
        <div className="search-bar h-full flex items-center">
          <Search placeholder="Tìm kiếm" onSearch={handleSearch} size="large" />
        </div>
      </div>
      <div className="h-full w-full flex justify-between items-center sm:hidden">
        hamberger
      </div>
    </div>
  )
}

export default HeaderLeft
