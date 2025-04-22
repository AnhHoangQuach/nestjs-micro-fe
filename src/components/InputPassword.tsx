import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { forwardRef, useState } from 'react'

const InputPassword = forwardRef((props: TextFieldProps, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      inputRef={ref}
      type={showPassword ? 'text' : 'password'}
      {...props}
    />
  )
})

export default InputPassword
