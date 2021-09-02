// libs
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
// models
import { AppDispatch, RootState } from 'app/store'
import { LoginAccount, RegisterAccount, VerifyEmailInput } from 'Models'
// api
import { fetchLogin, fetchRegister, fetchVerifyEmail, logout } from './api'

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch()
  const onFetch = async (data: LoginAccount) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchLogin(data))
    if (fetchLogin.fulfilled.match(resultAction)) {
      toast.success('Đăng nhập thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onFetch]
}

export const useRegister = () => {
  const dispatch: AppDispatch = useDispatch()
  const onFetch = async (data: RegisterAccount) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchRegister(data))
    const isSuccess = fetchRegister.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success(
        'Mã xác thực đã được gửi vào email của bạn. Vui lòng kiểm tra email và nhập mã'
      )
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onFetch]
}

export const useVerifyEmail = () => {
  const dispatch: AppDispatch = useDispatch()
  const { token } = useGetAuth()
  const onVerify = async (data: VerifyEmailInput) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchVerifyEmail({ data, token }))
    const isSuccess = fetchVerifyEmail.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success('Xác thực tài khoản thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onVerify]
}

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    toast.success('Vui lòng đăng nhập để tiếp tục')
  }

  return [onLogout]
}

export const useGetAuth = () => {
  return useSelector((state: RootState) => state.auth)
}
