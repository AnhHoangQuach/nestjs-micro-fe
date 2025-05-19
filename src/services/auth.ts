import { client } from './axios'

const login = (body: LoginBody): Promise<LoginResponse> => client.post(`/users/login`, body)
const register = (body: RegisterBody) => client.post(`/users`, body)
const getUser = (): Promise<GetUserResponse> => client.get(`/users`)

export default {
  login,
  register,
  getUser
}
