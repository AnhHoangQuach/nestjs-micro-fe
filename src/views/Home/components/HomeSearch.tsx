import { Search } from '@mui/icons-material'
import { Box, BoxProps, Grid2, InputAdornment, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useDebounce } from 'react-use'

type FormValues = {
  search: string
}

type Props = BoxProps & {
  onSearchChange?: (values: FormValues) => void
}

const HomeSearch = ({ onSearchChange, ...props }: Props) => {
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      search: '',
    },
  })

  const { search } = watch()
  useDebounce(() => onSearchChange?.({ search }), 100, [search])

  return (
    <Box {...props}>
      <Grid2 columnSpacing={4} rowSpacing={3}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <Controller
            control={control}
            name="search"
            render={({ field }) => (
              <TextField
                fullWidth
                placeholder="Tìm kiếm..."
                size="small"
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default HomeSearch
