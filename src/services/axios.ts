import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_URL } from 'env'
import { enqueueSnackbar } from 'notistack'
import { signOut } from 'reducers/profileSlice'
import { store } from 'reducers/store'

const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const { accessToken } = store.getState().profile
  if (accessToken) {
    Object.assign(config.headers, {
      Authorization: `Bearer ${accessToken}`,
    })
  }
  if (config.data instanceof FormData) {
    Object.assign(config.headers, {
      'Content-Type': 'multipart/form-data',
    })
  }
  return config
}

const onError = async (error: AxiosError<ErrorResponse, string>) => {
  const { response } = error
  if (response) {
    const { data, status } = response
    const isAuth = error.config?.url?.startsWith('/auth')
    if (!isAuth && status === 401) {
      enqueueSnackbar('Phiên đăng nhập hết hạn', { key: 'SESSION_EXPIRED', variant: 'info' })
      store.dispatch(signOut())
    } else {
      enqueueSnackbar(data.message ?? 'Lỗi không xác định', {
        variant: 'error',
      })
    }
  } else {
    enqueueSnackbar('Lỗi kết nối đến hệ thống', { variant: 'error' })
  }
  return Promise.reject(error)
}

const client = axios.create({ baseURL: API_URL + '/api' })
client.interceptors.request.use(beforeRequest)
client.interceptors.response.use(({ data }) => data.data, onError)

export { client }
