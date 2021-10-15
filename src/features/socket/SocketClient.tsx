// libs
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef } from 'react'
// interface
import { AppDispatch, RootState } from 'app/store'
// api
import { getOnlineUser } from 'features/onlineUser/api'
import { socketAction } from './api'
import { getNotification } from 'features/notification/api'
// socket.io
import io from 'socket.io-client'
// @ts-ignore
import notificationSound from 'assets/swiftly-610.mp3'
import { NotificationType } from 'Models'

const SocketClient: React.FC = () => {
  const {
    user: currentUser,
    socket,
    onlineUser
  } = useSelector((state: RootState) => state)
  const dispatch: AppDispatch = useDispatch()
  const { socketActions } = socket
  const { user } = currentUser
  const audioRef = useRef<any>()

  const playNotificationSound = () => {
    audioRef.current.play()
  }

  useEffect((): any => {
    // @ts-ignore
    const socket = io(process.env.REACT_APP_SOCKET_URL)
    dispatch(socketAction(socket))
    return () => socket.close()
  }, [dispatch])

  // join socket: client ----(user)---> server
  useEffect(() => {
    socketActions?.emit('joinSocket', user)
  }, [socketActions, user])

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
  }, [socketActions, dispatch, onlineUser])

  // nhan thong bao loi moi ket ban
  useEffect(() => {
    socketActions?.on(
      'receiveFriendRequest',
      (notification: NotificationType) => {
        // @ts-ignore
        dispatch(getNotification(notification))
        playNotificationSound()
      }
    )
    return () => socketActions?.off('receiveFriendRequest')
  }, [socketActions, dispatch])

  // nhan thong bao like post
  useEffect(() => {
    socketActions?.on(
      'sendNotificationLikePost',
      (notification: NotificationType) => {
        // @ts-ignore
        dispatch(getNotification(notification))
        playNotificationSound()
      }
    )
    return () => socketActions?.off('sendNotificationLikePost')
  }, [socketActions, dispatch])

  // nhan thong bao comment post
  useEffect(() => {
    socketActions?.on(
      'sendNotificationCommentPost',
      (notification: NotificationType) => {
        // @ts-ignore
        dispatch(getNotification(notification))
        playNotificationSound()
      }
    )
    return () => socketActions?.off('sendNotificationCommentPost')
  }, [socketActions, dispatch])

  return (
    <audio className="hidden" controls ref={audioRef}>
      <source src={notificationSound} type="audio/mp3" />
    </audio>
  )
}

export default SocketClient
