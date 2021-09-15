import React from 'react'

const LoadingPage = () => {
  return (
    <div className="absolute inset-0 bg-transparent z-50 flex justify-center items-center">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  )
}

export default LoadingPage
