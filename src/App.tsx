// libs
import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// components
import CustomNotification from 'components/CustomNotification'
import AppLayout from 'components/layout/AppLayout'
import LoadingPage from 'components/LoadingPage'
// socket.io
import io from 'socket.io-client'
import { socketAction } from 'features/socket/api'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect((): any => {
    // @ts-ignore
    const socket = io(process.env.REACT_APP_SOCKET_URL)
    dispatch(socketAction(socket))
    return () => socket.close()
  }, [dispatch])

  return (
    <Suspense fallback={<LoadingPage />}>
      <AppLayout />
      <CustomNotification />
    </Suspense>
  )
}

export default App
