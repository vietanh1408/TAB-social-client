// libs
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
// store
import { persistor, store } from 'app/store'
// components
import LoadingPage from 'components/LoadingPage'
import Header from 'components/layout/header/Header'
import Footer from 'components/layout/footer/Footer'
// route
import GenerateRoute from 'routes/GenerateRoute'
import CustomNotification from 'components/CustomNotification'

const App = () => {
  console.log('run...')
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<LoadingPage />}>
            <Header />
            <GenerateRoute />
            <Footer />
            <CustomNotification />
          </Suspense>
        </PersistGate>
      </Provider>
    </Router>
  )
}

export default App
