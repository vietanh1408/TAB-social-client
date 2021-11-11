import { setHeaders } from 'utils/setHeaders'
import axiosClient from './axiosClient'

const chatApi = {
  getAllConversations() {
    const url = `/chats`
    return axiosClient.get(url, setHeaders())
  },
  getConversation(roomId: string) {
    const url = `/chats/${roomId}`
    return axiosClient.get(url, setHeaders())
  },
  createMessage(data: any) {
    const url = `/chats`
    return axiosClient.post(url, data, setHeaders())
  }
}

export default chatApi
