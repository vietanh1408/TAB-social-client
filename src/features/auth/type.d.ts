declare module 'Models' {
  export interface UserState {
    id: string
    email: string
    name: string
    phone: string
    avatar: string
    background: string
  }

  export interface AuthState {
    token: string
    user: UserState | null
    error: anym
    isLoading: boolean
  }
}
