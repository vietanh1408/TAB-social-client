declare module 'Models' {
  export interface DataUpload {
    data: string
  }

  export interface DataRemoveUpload {
    public_id?: string
    url?: string
  }

  export interface ResponseUpload {
    message: string
    success: boolean
    public_id: string
    url: string
  }

  export interface ResponseState {
    response: ResponseUpload | null
    isLoading: boolean
  }
}
