import { fetchCreateNotification } from './../notification/api'
// libs
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
// models
import { AppDispatch, RootState } from 'app/store'
import {
  LoginAccount,
  LoginGoogle,
  RegisterAccount,
  VerifyEmailInput
} from 'Models'
// api
import {
  fetchAcceptFriendRequest,
  fetchEditProfile,
  fetchLogin,
  fetchLoginGoogle,
  fetchRegister,
  fetchSendFriendRequest,
  fetchUnfriend,
  fetchVerifyEmail,
  logout
} from './api'
import { useGetProfile } from 'features/profile/hooks'

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch()
  const onFetch = async (data: LoginAccount) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchLogin(data))
    if (fetchLogin.fulfilled.match(resultAction)) {
      toast.success('Đăng nhập thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onFetch]
}

export const useRegister = () => {
  const dispatch: AppDispatch = useDispatch()
  const onFetch = async (data: RegisterAccount) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchRegister(data))
    const isSuccess = fetchRegister.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success(
        'Mã xác thực đã được gửi vào email của bạn. Vui lòng kiểm tra email và nhập mã'
      )
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onFetch]
}

export const useVerifyEmail = () => {
  const dispatch: AppDispatch = useDispatch()
  const onVerify = async (data: VerifyEmailInput) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchVerifyEmail(data))
    const isSuccess = fetchVerifyEmail.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success('Xác thực tài khoản thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }
  return [onVerify]
}

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    toast.success('Vui lòng đăng nhập để tiếp tục')
  }

  return [onLogout]
}

export const useLoginWithGoogle = () => {
  const dispatch: AppDispatch = useDispatch()

  const onLoginGoogle = async (data: LoginGoogle) => {
    // @ts-ignore
    await dispatch(fetchLoginGoogle(data))
  }

  return [onLoginGoogle]
}

export const useEditProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { profile, isLoading } = useGetProfile()
  const onEditProfile = async (id: string | undefined, data: any) => {
    // @ts-ignore
    const resultAction = await dispatch(fetchEditProfile({ id, data }))
    const isSuccess = fetchEditProfile.fulfilled.match(resultAction)
    if (isSuccess) {
      toast.success('Cập nhật thành công')
    } else {
      toast.error(resultAction.payload?.data?.message)
    }
  }

  return { onEditProfile, profile, isLoading }
}

export const useSendFriendRequest = () => {
  const dispatch: AppDispatch = useDispatch()

  const { socketActions } = useSelector((state: RootState) => state.socket)
  const { user } = useSelector((state: RootState) => state.user)

  const onSendFriendRequest = async (profile: any) => {
    const notification = {
      text: `${user?.name} đã gửi lời mời kết bạn`,
      user: user?._id,
      url: `${process.env.REACT_APP_URL}/profile/${user?._id}`,
      receivers: profile?._id
    }
    // @ts-ignore
    const resultAction = await dispatch(fetchSendFriendRequest(profile?._id))
    // gui loi moi ket ban => gui thong bao den nguoi nhan
    if (fetchSendFriendRequest.fulfilled.match(resultAction)) {
      // @ts-ignore
      const result = await dispatch(fetchCreateNotification(notification))
      if (fetchCreateNotification.fulfilled.match(result)) {
        // gui thong bao socket
        socketActions?.emit('sendFriendRequest', notification)
      }
    }
  }
  return [onSendFriendRequest]
}

export const useAcceptFriendRequest = () => {
  const dispatch: AppDispatch = useDispatch()

  const onAccept = (id: string | undefined) => {
    // @ts-ignore
    dispatch(fetchAcceptFriendRequest(id))
  }

  return [onAccept]
}

export const useUnfriend = () => {
  const dispatch: AppDispatch = useDispatch()

  const onUnfriend = (id: string | undefined) => {
    // @ts-ignore
    dispatch(fetchUnfriend(id))
  }

  return [onUnfriend]
}

// get state
export const useGetAuth = () => {
  return useSelector((state: RootState) => state.user)
}
