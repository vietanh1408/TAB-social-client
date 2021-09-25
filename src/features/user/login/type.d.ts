declare module 'Models' {
  export interface LoginAccount {
    emailOrPhone: string
    password: string
  }

  export interface LoginGoogle {
    tokenId: string
  }
}
