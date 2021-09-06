import uploadApi from 'api/uploadApi'

export const uploadImageApi = async ({ file, token }: any) => {
  try {
    const response = await uploadApi.upload(file, token)
  } catch (err: any) {
    console.log(err.response)
  }
}
