import { Close } from "@mui/icons-material"
import { IconButton, IconButtonProps } from "@mui/material"

const DialogCloseButton = (props: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        ...props.sx,
      }}
    >
      <Close />
    </IconButton>
  )
}

export default DialogCloseButton
