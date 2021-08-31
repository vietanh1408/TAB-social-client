// libs
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
// components
import RegisterForm from './Form'
import LoadingPage from 'components/LoadingPage'
// constants
import { navName } from 'constants/navName'
// hooks
import { useGetToken, useRegister } from '../hooks'

import { RegisterAccount } from 'Models'
import AuthImage from 'assets/Auth-image.png'

const RegisterPage = () => {
  const history = useHistory()

  const [onFetch] = useRegister()

  const { token, isLoading } = useGetToken()

  const handleSubmitForm = (data: RegisterAccount) => {
    onFetch(data)
  }

  useEffect(() => {
    if (token) {
      history.push(navName.VERIFY_EMAIL)
    }
  }, [token, history])

  return (
    <div id="auth_page">
      {isLoading && <LoadingPage />}
      <div className="container py-28 xl:py-32 flex justify-between items-center w-full h-full">
        <div className="image h-full w-full hidden lg:flex justify-center items-center">
          <img src={AuthImage} alt="register-img" />
        </div>
        <RegisterForm
          handleSubmitForm={handleSubmitForm}
          title="Đăng ký"
          text="Cùng đăng ký và trải nghiệm ứng dụng nào !"
        />
      </div>
    </div>
  )
}

export default RegisterPage
