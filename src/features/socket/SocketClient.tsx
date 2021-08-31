import { RootState } from 'app/store'
import React from 'react'
import { useSelector } from 'react-redux'

const SocketClient = () => {
  const { auth, socket } = useSelector((state: RootState) => state)

  return <div>socket</div>
}

export default SocketClient
