import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid2,
  TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { InputNumber } from 'components'
import DialogCloseButton from 'components/DialogCloseButton'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { bankService, queryClient } from 'services'

type DialogController = PopupController & DialogProps

type Props = DialogController & {
  bank?: Bank
}
const PopupCreateBank = ({ bank, onClose, onSuccess, ...props }: Props) => {
  const isCreate = !bank
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<BankCreateBody>()

  useEffect(() => {
    reset({
      customerId: bank?.customerId ?? '',
      numberBank: bank?.numberBank ?? '',
      note: bank?.note ?? '',
    })
  }, [reset, props.open, bank])

  const updateBank = useMutation({ mutationFn: bankService.updateBank })
  const createBank = useMutation({ mutationFn: bankService.createBank })

  const onSubmit = async (values: BankCreateBody) => {
    if (isCreate) {
      await createBank.mutateAsync({ ...values })
      enqueueSnackbar('Tạo bank thành công')
    } else {
      await updateBank.mutateAsync({ ...values, id: bank.id })
      enqueueSnackbar('Cập nhật bank thành công')
    }
    queryClient.invalidateQueries({ queryKey: ['bankService.fetchBanks'] })
    onClose()
    onSuccess?.()
  }

  return (
    <Dialog maxWidth="md" {...props}>
      <DialogCloseButton onClick={onClose} />
      <DialogTitle>{isCreate ? 'Tạo bank' : 'Cập nhật bank'}</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <Controller
              control={control}
              name="customerId"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Customer ID"
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    inputComponent: InputNumber,
                  }}
                />
              )}
              rules={{
                required: 'Customer ID không được để trống',
              }}
            />
          </Grid2>

          <Grid2 size={12}>
            <Controller
              control={control}
              name="numberBank"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Number Bank"
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              rules={{
                required: 'Number Bank không được để trống',
              }}
            />
          </Grid2>

          <Grid2 size={12}>
            <Controller
              control={control}
              name="note"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Note"
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button loading={isSubmitting} onClick={handleSubmit(onSubmit)} variant="contained">
          {isCreate ? 'Tạo mới' : 'Cập nhật'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PopupCreateBank
