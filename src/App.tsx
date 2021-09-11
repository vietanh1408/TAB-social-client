// libs
import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// components
import CustomNotification from 'components/CustomNotification'
import Footer from 'components/layout/footer/Footer'
import Header from 'components/layout/header/Header'
import LoadingPage from 'components/LoadingPage'
// route
import GenerateRoute from 'routes/GenerateRoute'
// socket.io
import io from 'socket.io-client'
import { socketAction } from 'features/socket/api'
import { useGetAuth } from 'features/auth/hooks'
import SocketClient from 'features/socket/SocketClient'

const App = () => {
  const { token } = useGetAuth()

  const dispatch = useDispatch()
  useEffect((): any => {
    // @ts-ignore
    const socket = io(process.env.REACT_APP_SOCKET_URL)
    dispatch(socketAction(socket))
    return () => socket.close()
  }, [dispatch])

  return (
    <Suspense fallback={<LoadingPage />}>
      {token && <Header />}
      <div className="md:container container mx-auto px-2 md:px-3 lg:px-4 xl:px-6">
        <GenerateRoute />
      </div>
      {token && <Footer />}
      <CustomNotification />
      {token && <SocketClient />}
    </Suspense>
  )
}

export default App
