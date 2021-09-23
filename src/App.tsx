// libs
import React, { Suspense } from 'react'
// components
import CustomNotification from 'components/CustomNotification'
import AppLayout from 'components/layout/AppLayout'
import LoadingPage from 'components/LoadingPage'

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AppLayout />
      <CustomNotification />
    </Suspense>
  )
}

export default App
