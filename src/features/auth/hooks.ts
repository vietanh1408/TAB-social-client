import { AppDispatch, RootState } from 'app/store'
import { LoginAccount, RegisterAccount } from 'Models'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, fetchRegister } from './api'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import { useNotification } from 'hook/useNotification'

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()
  const onFetch = async (data: LoginAccount) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchLogin(data))
    if (fetchLogin.fulfilled.match(resultAction)) {
      toast.success('Login success')
      history.push('/')
    } else {
      toast.error(resultAction.payload.data.message)
    }
  }
  return [onFetch]
}

export const useRegister = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()
  const onFetch = async (data: RegisterAccount) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchRegister(data))
    const isSuccess = fetchRegister.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success('Register success')
      history.push('/')
    } else {
      toast.error(resultAction.payload.data.message)
    }
  }
  return [onFetch]
}

export const useGetToken = () => {
  return useSelector((state: RootState) => state.auth)
}
