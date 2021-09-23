// libs
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

// reducers
import authReducer from 'features/auth/api'
import socketReducer from 'features/socket/api'
import onlineUserReducer from 'features/onlineUser/api'
import profileReducer from 'features/profile/api'
import uploadReducer from 'features/upload/api'
import postReducer from 'features/newsFeed/api'

const history = createBrowserHistory()

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token']
}

export const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),

  router: connectRouter(history),
  socket: socketReducer,
  onlineUser: onlineUserReducer,
  profile: profileReducer,
  upload: uploadReducer,
  post: postReducer
}
