import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import authReducer from 'features/auth/api'
import notificationReducer from 'features/notification/api'

const history = createBrowserHistory()

export const rootReducer = {
  router: connectRouter(history),
  auth: authReducer,
  notification: notificationReducer
}
