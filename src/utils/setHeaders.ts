export const setHeaders = () => {
  const token = localStorage.getItem('accessToken')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
