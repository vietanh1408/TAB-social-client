import AuthImage from 'assets/Auth-image.png'
import LoadingPage from 'components/LoadingPage'
import { LoginAccount } from 'Models'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import LoginForm from './Form'
import { useGetAuth, useLogin } from '../hooks'

const Login = () => {
  const history = useHistory()

  const [onFetch] = useLogin()

  const { token, isLoading } = useGetAuth()

  const handleSubmitForm = (data: LoginAccount) => {
    onFetch(data)
  }

  useEffect(() => {
    if (token) {
      history.push('/')
    }
  }, [token, history])

  return (
    <div id="auth_page">
      {isLoading && <LoadingPage />}
      <div className="container py-28 xl:py-32 flex justify-between items-center w-full h-full">
        <div className="image h-full w-full hidden lg:flex justify-center items-center">
          <img src={AuthImage} alt="login-img" />
        </div>
        <LoginForm
          handleSubmitForm={handleSubmitForm}
          title="Đăng nhập"
          text="Chào mừng bạn đã đến với TAB !"
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Login
