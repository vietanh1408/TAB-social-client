declare module 'Models' {
  export interface RegisterAccount {
    email: string
    name: string
    phone: string
    password: string
    confirmPassword?: string
  }
}
