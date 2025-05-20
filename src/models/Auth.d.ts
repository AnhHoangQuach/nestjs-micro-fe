type LoginBody = {
  password: string
  email: string
}

type LoginResponse = {
  data: {
    token?: string
  }
}

type ProfileType = LoginResponse & {
  id?: string
  user?: User
  isLoggedIn?: boolean
}

type RegisterBody = LoginBody & {
  name: string;
}

type User = DBTimeAudit & {
  email: string
  name: string
  role: string;
}

type GetUserResponse = {
  data: User
}
