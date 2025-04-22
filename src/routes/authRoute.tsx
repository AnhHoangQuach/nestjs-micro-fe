import { LoginScreen, RegisterScreen } from 'views/Auth '

const authRoute = {
  login: {
    component: LoginScreen,
    path: '/login',
    url: '/auth/login',
    name: 'Login'
  },
  register: {
    path: '/register',
    url: '/auth/register',
    component: RegisterScreen,
    name: 'Register'
  },
}

export default authRoute
