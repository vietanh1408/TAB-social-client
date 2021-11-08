import { identity, pickBy } from 'lodash'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

export const useSearchParams = (search: string) => {
  const [searchParams, setSearchParams] = useState<any>(
    queryString.parse(search)
  )

  useEffect(() => {
    setSearchParams(queryString.parse(search))
  }, [search])

  return searchParams
}

export const useUpdateSearch = (pathname: string, search: any) => {
  const history = useHistory()

  const handleSearchClick = (value: any) => {
    history.push(
      `${pathname}?${queryString.stringify(pickBy(value, identity))}`
    )
  }

  const handleChangePageSize = (index: number, size: number | undefined) => {
    const searchParams = queryString.parse(search)
    searchParams.pageSize = size?.toString() ?? ''
    searchParams.pageIndex = index?.toString()

    history.push(`${pathname}?${queryString.stringify(searchParams)}`)
  }

  return { handleSearchClick, handleChangePageSize }
}
