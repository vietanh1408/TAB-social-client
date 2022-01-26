import { RootState } from 'app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from './api'

export const useSearch = (search: string) => {
  const { result, isLoading, error } = useSelector(
    (state: RootState) => state.search
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSearch(search))
  }, [search])

  return { result, isLoading, error }
}
