// libs
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

// reducers
import userReducer from 'features/user/api'
import socketReducer from 'features/socket/api'
import onlineUserReducer from 'features/onlineUser/api'
import profileReducer from 'features/profile/api'
import uploadReducer from 'features/upload/api'
import postReducer from 'features/newsFeed/api'
import notificationReducer from 'features/notification/api'
import friendReducer from 'features/friend/api'
import chatReducer from 'features/chat/api'
import searchReducer from 'features/search/api'

const history = createBrowserHistory()

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token']
}

export const rootReducer = {
  user: persistReducer(userPersistConfig, userReducer),

  router: connectRouter(history),
  socket: socketReducer,
  onlineUser: onlineUserReducer,
  profile: profileReducer,
  upload: uploadReducer,
  post: postReducer,
  notification: notificationReducer,
  friend: friendReducer,
  chat: chatReducer,
  search: searchReducer
}
