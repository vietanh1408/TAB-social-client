import { toast } from 'react-toastify'

export const generateDefaultAvt = (name: any) => {
  const firstCharacter = name.charAt(0).toUpperCase()
  return firstCharacter
}

export const showError = (error: any) => {
  if (!error.response) {
    toast.error('Network Error')
  }
}
