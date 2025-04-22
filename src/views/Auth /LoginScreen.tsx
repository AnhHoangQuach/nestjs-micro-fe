import { Button, Container, Paper, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { InputPassword } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn } from 'reducers/profileSlice'
import { authRoute } from 'routes'
import { authService } from 'services'

const LoginScreen = () => {
  const { control, handleSubmit } = useForm<LoginBody>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const dispatch = useDispatch()

  const { mutateAsync, isPending } = useMutation({ mutationFn: authService.login })

  const handleClickSubmit = () => {
    handleSubmit(async (values) => {
      const result = await mutateAsync(values)
      dispatch(signIn(result))
    })()
  }

  return (
    <Container maxWidth="sm">
      <Paper className="flex flex-col gap-6 p-8">
        <Controller
          name="username"
          control={control}
          rules={{
            required: 'Username không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              variant="standard"
              label="Username"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Mật khẩu không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <InputPassword
              {...field}
              fullWidth
              variant="standard"
              label="Mật khẩu"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Button fullWidth variant="contained" onClick={handleClickSubmit} disabled={isPending}>
          Đăng nhập
        </Button>

        <div className="flex justify-center space-x-2">
          <span>Bạn chưa có tài khoản?</span>
          <Link className="font-medium hover:text-primary-main" to={authRoute.register.url}>
            Đăng ký
          </Link>
        </div>
      </Paper>
    </Container>
  )
}

export default LoginScreen
