import React from 'react'
import { Avatar, List } from 'antd'
import { useReadNotification } from './hooks'
import classNames from 'classnames'

interface NotificationListProps {
  notificationList: any
  classList?: string
}

const NotificationList: React.FC<NotificationListProps> = (
  props: NotificationListProps
) => {
  const { notificationList = [], classList } = props

  const [onReadNotification] = useReadNotification()

  const handleReadNotification = (id: string) => {
    onReadNotification(id)
  }
  return (
    <div className={`cursor-pointer ${classList}`}>
      <List
        itemLayout="horizontal"
        dataSource={notificationList}
        renderItem={(item: any) => (
          <List.Item
            onClick={() => handleReadNotification(item?._id)}
            className={`p-4 ${classNames({
              'bg-gray-400': item?.isRead === false
            })}`}
          >
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
