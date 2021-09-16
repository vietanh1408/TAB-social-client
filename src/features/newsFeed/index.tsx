import { Card } from 'antd'
import CreatePost from 'components/CreatePost'
import React from 'react'

const NewsFeed = () => {
  return (
    <div id="news-feed" style={{ height: '2000px' }}>
      <CreatePost />
    </div>
  )
}

export default NewsFeed
