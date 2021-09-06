// libs
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

// reducers
import authReducer from 'features/auth/api'
import socketReducer from 'features/socket/api'
import onlineUserReducer from 'features/onlineUser/api'
import profileReducer from 'features/profile/api'

const history = createBrowserHistory()

export const rootReducer = {
  router: connectRouter(history),
  socket: socketReducer,
  onlineUser: onlineUserReducer,
  auth: authReducer,
  profile: profileReducer
}
