// libs
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
// constants
import { navName } from 'constants/navName'
// models
import { VerifyEmailInput } from 'Models'
// hooks
import { useGetAuth, useVerifyEmail } from '../hooks'
// components
import VerifyForm from './Form'

const VerifyEmail = () => {
  const { isVerify } = useGetAuth()

  const history = useHistory()

  const [onVerify] = useVerifyEmail()

  const handleSubmitForm = (data: VerifyEmailInput) => {
    onVerify(data)
  }

  useEffect(() => {
    if (isVerify) {
      history.push(navName.HOME)
    }
  }, [isVerify, history])

  return (
    <div className="verify-page h-full w-full absolute inset-0 flex justify-center items-center bg-gray-100">
      <VerifyForm
        handleSubmitForm={handleSubmitForm}
        title="Xác thực email của bạn"
      />
    </div>
  )
}

export default VerifyEmail
