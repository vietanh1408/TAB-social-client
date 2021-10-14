import { AppDispatch, RootState } from 'app/store'
import { getOnlineUser } from 'features/onlineUser/api'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socketAction } from './api'
// socket.io
import io from 'socket.io-client'
import { getNotification } from 'features/notification/api'

const SocketClient: React.FC = () => {
  const {
    user: currentUser,
    socket,
    onlineUser
  } = useSelector((state: RootState) => state)
  const dispatch: AppDispatch = useDispatch()
  const { socketActions } = socket
  const { user } = currentUser

  useEffect((): any => {
    // @ts-ignore
    const socket = io(process.env.REACT_APP_SOCKET_URL)
    dispatch(socketAction(socket))
    return () => socket.close()
  }, [dispatch])

  // join socket: client ----(user)---> server
  useEffect(() => {
    socketActions?.emit('joinSocket', user)
  }, [socket, user])

  // get user online: client ----(user)----> server
  useEffect(() => {
    socketActions?.emit('userOnline', user)
  }, [socketActions, user])
  // client <---(online followings)---- server
  useEffect(() => {
    socketActions?.on('ownUserOnline', (data: any) => {
      // @ts-ignore
      dispatch(getOnlineUser(data))
    })
    return () => socketActions?.off('ownUserOnline')
  }, [socket, dispatch, onlineUser])

  // // like post
  // useEffect(() => {

  // }, [socket, dispatch])

  // send friend request ==> send notification
  // useEffect(() => {
  //   socket.socketActions('sendFriendRequest', (newRequest) => {
  //     // dispatch()
  //   })
  // })

  // nhan thong bao like post
  useEffect(() => {
    socketActions?.on('sendNotificationLikePost', (notification: any) => {
      // @ts-ignore
      dispatch(getNotification(notification))
    })
    return () => socketActions?.off('sendNotificationLikePost')
  }, [socket, dispatch])

  return <div></div>
}

export default SocketClient
