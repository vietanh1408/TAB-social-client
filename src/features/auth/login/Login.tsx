// libs
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
// components
import LoginForm from './Form'
import AuthPage from '../AuthPage'
// models
import { LoginAccount } from 'Models'
// hooks
import { useGetAuth, useLogin } from '../hooks'
// constants
import { navName } from 'constants/navName'

const Login = () => {
  const history = useHistory()

  const [onFetch] = useLogin()

  const { token, isLoading } = useGetAuth()

  const handleSubmitForm = (data: LoginAccount) => {
    onFetch(data)
  }

  useEffect(() => {
    if (token) {
      history.push(navName.HOME)
    }
  }, [token, history])

  return (
    <AuthPage>
      <LoginForm
        handleSubmitForm={handleSubmitForm}
        title="Đăng nhập"
        text="Chào mừng bạn đã đến với TAB !"
        isLoading={isLoading}
      />
    </AuthPage>
  )
}

export default Login
