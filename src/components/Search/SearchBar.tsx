import Search from 'antd/lib/input/Search'
import { useSearchParams } from 'hook/useSearchParams'
import React from 'react'
import { useHistory, useLocation } from 'react-router'

const SearchBar: React.FC = () => {
  const { search } = useLocation()

  const history = useHistory()

  const searchParams = useSearchParams(search)

  const handleSearch = (keyword: string) => {
    history.push({
      pathname: '/search',
      search: `?keyword=${keyword}`
    })
  }
  return (
    <Search
      placeholder="Tìm kiếm"
      onSearch={handleSearch}
      size="large"
      defaultValue={searchParams?.keyword}
    />
  )
}

export default SearchBar
