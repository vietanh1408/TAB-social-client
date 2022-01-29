import { List, Pagination } from 'antd'
import UserCard from 'components/User/UserCard'
import { DEFAULT_PAGE_SIZE } from 'constants/index'
import { UserType } from 'Models'
import React from 'react'

type UserResultType = {
  users: UserType[]
  totalUser: number
  pageIndex: number
  handleChangePageSize: (page: number, pageSize?: number) => void
}

const UserResult: React.FC<UserResultType> = (props: UserResultType) => {
  const { users, totalUser, pageIndex, handleChangePageSize } = props

  return (
    <React.Fragment>
      <List
        bordered
        dataSource={users}
        renderItem={(user: UserType) => (
          <UserCard
            user={user}
            key={user?._id}
            isLoading={false}
            handleSend={() => console.log('handleSend')}
            handleUnFriend={() => console.log('handleSend')}
            handleUnSend={() => console.log('handleSend')}
          />
        )}
      />
      <div className="w-full flex justify-center items-center mt-4">
        <Pagination
          defaultPageSize={DEFAULT_PAGE_SIZE}
          current={pageIndex ?? 1}
          total={totalUser}
          hideOnSinglePage
          onChange={handleChangePageSize}
        />
      </div>
    </React.Fragment>
  )
}

export default UserResult
