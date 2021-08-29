import React from 'react'

const LoadingPage = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-50 z-50 flex justify-center items-center">
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
