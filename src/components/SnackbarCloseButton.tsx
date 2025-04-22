import { Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { SnackbarKey, useSnackbar } from "notistack"

type Props = {
  snackbarKey: SnackbarKey
}

const SnackbarCloseButton = ({ snackbarKey }: Props) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton
      onClick={() => closeSnackbar(snackbarKey)}
      sx={{
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      <Close color="action" fontSize="small" />
    </IconButton>
  )
}

export default SnackbarCloseButton
