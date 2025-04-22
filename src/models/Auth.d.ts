type LoginBody = {
  password: string
  username: string
}

type LoginResponse = {
  accessToken?: string
}

type ProfileType = LoginResponse & {
  id?: string
  username?: string
  role?: string
  isLoggedIn?: boolean
}

type RegisterBody = LoginBody & {
  passwordConfirm: string
}

type User = DBTimeAudit & {
  username: string
  role: string
}
