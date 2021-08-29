export const setHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
