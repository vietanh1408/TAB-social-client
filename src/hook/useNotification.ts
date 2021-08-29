import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const useNotification = (
  error?: any,
  isSuccess?: boolean,
  message?: string
) => {
  useEffect(() => {
    if (error) {
      const message = error.split(':')[0]
      toast.error(message)
    }
    if (isSuccess) {
      toast.success(message)
    }
  }, [error, isSuccess])
}
