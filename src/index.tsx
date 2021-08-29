// libs
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
// component
import App from './App'
// styles
import 'antd/dist/antd.css'
import './styles/tailwindcss.css'
import './styles/index.css'
// store
import { persistor, store } from 'app/store'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById('root')
)
