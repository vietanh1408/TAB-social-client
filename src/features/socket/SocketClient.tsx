import { AppDispatch, RootState } from 'app/store'
import { getOnlineUser } from 'features/onlineUser/api'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socketAction } from './api'
// socket.io
import io from 'socket.io-client'

const SocketClient: React.FC = () => {
  const { auth, socket, onlineUser } = useSelector((state: RootState) => state)
  const dispatch: AppDispatch = useDispatch()
  const { socketActions } = socket
  const { user } = auth

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

  return <div></div>
}

export default SocketClient
