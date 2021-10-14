// libs
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

console.log(
  '%cChào mừng bạn đến với TAB-SOCIAL%c!',
  'color: #1ab374; font-weight: bold; font-size: 2rem; text-shadow: 0 0 5px rgba(0,0,0,0.2);',
  'color: #ff7b5f; font-weight: bold; font-size: 2rem; text-shadow: 0 0 5px rgba(0,0,0,0.2);'
)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById('root')
)
