// libs
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
// components
import RegisterForm from './Form'
import AuthPage from '../AuthPage'
// constants
import { navName } from 'constants/navName'
// hooks
import { useGetAuth, useRegister } from '../hooks'
// models
import { RegisterAccount } from 'Models'

const RegisterPage = () => {
  const history = useHistory()

  const [onFetch] = useRegister()

  const { token, isLoading } = useGetAuth()

  const handleSubmitForm = (data: RegisterAccount) => {
    onFetch(data)
  }

  useEffect(() => {
    if (token) {
      history.push(navName.VERIFY_EMAIL)
    }
  }, [token, history])

  return (
    <AuthPage>
      <RegisterForm
        handleSubmitForm={handleSubmitForm}
        title="Đăng ký"
        text="Cùng đăng ký và trải nghiệm ứng dụng nào !"
        isLoading={isLoading}
      />
    </AuthPage>
  )
}

export default RegisterPage
