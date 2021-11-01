import { useDispatch } from 'react-redux'
import { fetchReadNotification } from './api'

export const useReadNotification = () => {
  const dispatch = useDispatch()

  const onReadNotification = (id: string) => {
    dispatch(fetchReadNotification(id))
  }
  return [onReadNotification]
}
