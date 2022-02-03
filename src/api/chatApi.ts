import { CreateMessage } from 'Models'
import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const chatApi = {
  getAllConversations() {
    const url = `/chats`
    return axiosClient.get(url, setHeaders())
  },
  getConversation(roomId?: string) {
    let url = `/chats/get-conversation`
    if (roomId) {
      url += `?roomId=${roomId}`
    }
    return axiosClient.get(url, setHeaders())
  },
  createMessage(data: CreateMessage) {
    console.log('message....', data)
    const url = `/chats`
    return axiosClient.post(url, data, setHeaders())
  }
}

export default chatApi
