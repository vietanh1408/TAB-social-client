import { AppDispatch, RootState } from 'app/store'
import { getOnlineUser } from 'features/onlineUser/api'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SocketClient = () => {
  const { auth, socket, onlineUser } = useSelector((state: RootState) => state)
  const dispatch: AppDispatch = useDispatch()
  const { socketActions } = socket
  const { user } = auth
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
