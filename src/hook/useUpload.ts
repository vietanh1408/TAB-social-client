import { AppDispatch } from 'app/store'
import { useDispatch } from 'react-redux'

export const useUpload = () => {
  const dispatch: AppDispatch = useDispatch()

  const onUpload = (file: File) => {
    console.log('file.....', file)
  }

  return [onUpload]
}
