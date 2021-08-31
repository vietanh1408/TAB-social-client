import { toast } from 'react-toastify'

export const showError = (error: any) => {
  if (!error.response) {
    toast.error('Network Error')
  }
}
