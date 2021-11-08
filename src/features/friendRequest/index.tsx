import { List, Pagination, Typography } from 'antd'
import LoadingPage from 'components/LoadingPage'
import { useSearchParams, useUpdateSearch } from 'hook/useSearchParams'
import React from 'react'
import { useLocation } from 'react-router'
import { useGetRequests } from './hooks'
import RequestList from './RequestList'

const FriendRequestPage: React.FC = () => {
  const { search, pathname } = useLocation()
  const searchParams = useSearchParams(search)

  const { handleChangePageSize } = useUpdateSearch(pathname, search)

  const { requests, isLoadingRequests, totalRequests } =
    useGetRequests(searchParams)
  if (isLoadingRequests) {
    return <LoadingPage />
  }
  return (
    <React.Fragment>
      <Typography.Title level={3}>Lời mời kết bạn</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={requests}
        renderItem={(item: any) => (
          <RequestList
            key={item?._id}
            request={item}
            isLoading={isLoadingRequests}
          />
        )}
      />
      <div className="w-full flex justify-center items-center">
        <Pagination
          current={+searchParams?.pageIndex ?? 1}
          total={totalRequests}
          hideOnSinglePage
          onChange={handleChangePageSize}
        />
      </div>
    </React.Fragment>
  )
}

export default FriendRequestPage
