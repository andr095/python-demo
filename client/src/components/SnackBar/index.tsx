import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export interface SnackBarProps {
    type: 'error' | 'success',
    isOpen: boolean,
    message: string
}

export default function CustomizedSnackbars (props: SnackBarProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(props.isOpen)
  }, [props.isOpen])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.type} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
