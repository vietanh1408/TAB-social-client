import { Spin, Tabs, Typography } from 'antd'
import PostResult from 'components/Search/PostResult'
import UserResult from 'components/Search/UserResult'
import { SearchType } from 'constants/enum'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'constants/index'
import { useSearchParams, useUpdateSearch } from 'hook/useSearchParams'
import React from 'react'
import { useLocation } from 'react-router'
import { useSearch } from './hooks'
const { TabPane } = Tabs
const SearchResultList: React.FC = () => {
  const { search, pathname } = useLocation()
  const { result, isLoading } = useSearch(search)
  const searchParams = useSearchParams(search)
  const { handleSearchClick, handleChangePageSize } = useUpdateSearch(
    pathname,
    search
  )

  const defaultType = searchParams?.type ?? SearchType.User

  const handleChangeType = (e: string) => {
    handleSearchClick({
      ...searchParams,
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      type: e
    })
  }

  const { users, posts, totalUser, totalPost } = result || {}
  return (
    <React.Fragment>
      <Typography.Title>Kết quả tìm kiếm</Typography.Title>

      <Tabs
        defaultActiveKey={defaultType}
        onChange={(e: string) => handleChangeType(e)}
      >
        <TabPane tab="Mọi người" key={SearchType.User}>
          <Spin spinning={isLoading}>
            {users && users.length > 0 ? (
              <UserResult
                users={users ?? []}
                totalUser={totalUser ?? 0}
                pageIndex={Number(searchParams?.pageIndex)}
                handleChangePageSize={handleChangePageSize}
              />
            ) : null}
          </Spin>
        </TabPane>
        <TabPane tab="Bài viết" key={SearchType.Post}>
          <Spin spinning={isLoading}>
            {posts && posts.length > 0 ? (
              <PostResult
                posts={posts ?? []}
                totalPost={totalPost ?? 0}
                pageIndex={Number(searchParams?.pageIndex)}
                handleChangePageSize={handleChangePageSize}
              />
            ) : null}
          </Spin>
        </TabPane>
      </Tabs>
    </React.Fragment>
  )
}

export default SearchResultList
