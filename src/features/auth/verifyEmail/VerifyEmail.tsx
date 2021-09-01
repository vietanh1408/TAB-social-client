import { navName } from 'constants/navName'
import { VerifyEmailInput } from 'Models'
import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import AuthPage from '../AuthPage'
import { useGetAuth, useSendMail, useVerifyEmail } from '../hooks'
import VerifyForm from './Form'

const VerifyEmail = () => {
  const { isVerify } = useGetAuth()

  const history = useHistory()

  const [onSendMail] = useSendMail()

  const [onVerify] = useVerifyEmail()

  const handleSubmitForm = (data: VerifyEmailInput) => {
    onVerify(data)
  }

  useEffect(() => {
    if (isVerify) {
      history.push(navName.HOME)
    } else {
      onSendMail()
    }
  }, [isVerify, history])

  return (
    // <div className="verify-page h-full w-full absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-100">
    //   <VerifyForm
    //     handleSubmitForm={handleSubmitForm}
    //     title="Xác thực email của bạn"
    //   />
    // </div>
    <AuthPage>
      <VerifyForm
        handleSubmitForm={handleSubmitForm}
        title="Xác thực email của bạn"
      />
    </AuthPage>
  )
}

export default VerifyEmail
