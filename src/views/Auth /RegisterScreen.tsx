import { Button, Container, Paper, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { InputPassword } from 'components'
import { enqueueSnackbar } from 'notistack'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authRoute } from 'routes'
import { authService } from 'services'

const RegisterScreen = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({ mutationFn: authService.register })

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      mutateAsync(values).then(() => {
        enqueueSnackbar('Đăng ký thành công', { variant: 'success' })
        navigate(authRoute.login.url, { replace: true })
      })
    })()
  }

  return (
    <Container maxWidth="sm">
      <Paper className="flex flex-col gap-6 p-8">
        <Controller
          name="name"
          defaultValue=""
          control={control}
          rules={{
            required: 'Tên không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              variant="standard"
              label="Tên"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="email"
          defaultValue=""
          control={control}
          rules={{
            required: 'Email không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              variant="standard"
              label="Email"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: 'Mật khẩu không được để trống',
            minLength: { value: 6, message: 'Mật khẩu có ít nhất 6 ký tự' },
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

        <Button fullWidth variant="contained" onClick={handleClickSubmit} loading={isPending}>
          Đăng ký
        </Button>

        <div className="flex justify-center space-x-2">
          <span>Đã có tài khoản?</span>
          <Link className="font-medium hover:text-primary-main" to={authRoute.login.url}>
            Đăng nhập
          </Link>
        </div>
      </Paper>
    </Container>
  )
}

export default RegisterScreen
