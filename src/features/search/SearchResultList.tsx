import LoadingPage from 'components/LoadingPage'
import React from 'react'
import { useLocation } from 'react-router'
import { useSearch } from './hooks'

const SearchResultList: React.FC = () => {
  const { search } = useLocation()

  const { result, isLoading, error } = useSearch(search)

  // console.log('result...............', result)

  if (isLoading) {
    return <LoadingPage />
  }

  return <div>Search Result Lsit</div>
}

export default SearchResultList
