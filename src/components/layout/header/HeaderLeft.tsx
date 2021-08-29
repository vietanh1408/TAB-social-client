import React from 'react'

const HeaderLeft = () => {
  return (
    <div className="header__left h-full border-2 border-black border-opacity-50">
      <div className="h-full w-full justify-between items-center sm:flex hidden">
        <div className="logo-icon">LOGO</div>
        <div className="search-bar">Search box</div>
      </div>
      <div className="h-full w-full flex justify-between items-center sm:hidden">
        hamberger
      </div>
    </div>
  )
}

export default HeaderLeft
