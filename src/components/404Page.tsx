import React from 'react'
import { useHistory } from 'react-router'
import { Button, Result } from 'antd'
import { navName } from 'constants/navName'

const NotFoundPage: React.FC = () => {
  const history = useHistory()

  const handleGoBack = () => {
    history.push(navName.HOME)
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lỗi 404 (Không tìm thấy trang)"
      extra={
        <Button type="primary" onClick={handleGoBack}>
          Quay lại
        </Button>
      }
    />
  )
}

export default NotFoundPage
