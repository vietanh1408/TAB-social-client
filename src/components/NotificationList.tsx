import React from 'react'
import { Avatar, List, notification } from 'antd'

interface NotificationListProps {
  notificationList: any
  classList?: string
}

const NotificationList: React.FC<NotificationListProps> = (
  props: NotificationListProps
) => {
  const { notificationList = [], classList } = props
  return (
    <div className={`cursor-pointer ${classList}`}>
      <List
        itemLayout="horizontal"
        dataSource={notificationList}
        className="p-4"
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item?.sender?.avatar?.url} />}
              title={''}
              description={<a href={item.url}>{item?.text}</a>}
            />
            {item?.image?.url && (
              <img src={item?.image?.url} className="w-10 h-10" />
            )}
          </List.Item>
        )}
      />
    </div>
  )
}

export default NotificationList
