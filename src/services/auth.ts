import { client } from './axios'

const login = (body: LoginBody): Promise<LoginResponse> => client.post(`/auth/login`, body)
const register = (body: RegisterBody): Promise<User> => client.post(`/auth/register`, body)

export default {
  login,
  register,
}
