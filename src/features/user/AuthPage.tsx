import React, { ReactChild, ReactChildren } from 'react'
import LoadingPage from 'components/LoadingPage'
import AuthImage from 'assets/Auth-image.png'
import { useGetAuth } from './hooks'

type AuthPageProps = {
  children: ReactChild | ReactChildren | React.ReactNode
}

const AuthPage: React.FC<AuthPageProps> = ({ children }: AuthPageProps) => {
  const { isLoading } = useGetAuth()

  return (
    <div id="auth_page">
      {isLoading && <LoadingPage />}
      <div className="container py-28 xl:py-32 flex justify-between items-center w-full h-full">
        <div className="auth_image h-full w-full hidden lg:flex justify-center items-center">
          <img src={AuthImage} alt="login-img" />
        </div>
        <div className="auth_child flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
