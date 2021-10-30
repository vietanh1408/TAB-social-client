// libs
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef } from 'react'
// interface
import { RootState } from 'app/store'
// api
import { socketAction } from './api'
import { addToOnlineList, getOnlineUser } from 'features/onlineUser/api'
import { getNotification } from 'features/notification/api'
// socket.io
import io from 'socket.io-client'
import { NotificationType } from 'Models'
// models
// @ts-ignore
import notificationSound from 'assets/swiftly-610.mp3'

const SocketClient: React.FC = () => {
  const {
    user: currentUser,
    socket,
    onlineUser
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
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

  useEffect(() => {
    socketActions?.emit('joinSocket', user)
  }, [socketActions, user])

  useEffect(() => {
    const currentUser = {
      _id: user?._id,
      name: user?.name,
      avatar: user?.avatar,
      followings: user?.followings,
      followers: user?.followers
    }
    socketActions?.emit('userOnline', currentUser)
  }, [socketActions, user])

  useEffect(() => {
    socketActions?.on('ownUserOnline', (data: any) => {
      dispatch(getOnlineUser(data))
    })
    return () => socketActions?.off('ownUserOnline')
  }, [socketActions, dispatch, onlineUser])

  useEffect(() => {
    socketActions?.on('checkUserOnlineToClient', (userOnlines: any) => {
      dispatch(addToOnlineList(userOnlines))
    })
    return () => socketActions?.off('checkUserOnlineToClient')
  }, [socketActions])

  // nhan thong bao loi moi ket ban
  useEffect(() => {
    socketActions?.on(
      'receiveFriendRequest',
      (notification: NotificationType) => {
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
