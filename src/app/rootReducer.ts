// libs
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

// reducers
import authReducer from 'features/auth/api'
import notificationReducer from 'features/notification/api'
import socketReducer from 'features/socket/api'
import onlineUserReducer from 'features/onlineUser/api'

const history = createBrowserHistory()

export const rootReducer = {
  router: connectRouter(history),
  notification: notificationReducer,
  socket: socketReducer,
  onlineUser: onlineUserReducer,
  auth: authReducer
}
