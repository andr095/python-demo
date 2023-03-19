import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

export function NavBar () {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
      {isAuthenticated && (
        <>
          <span style={{ marginRight: 4 }}>{user?.email}</span>
          <Button variant="outlined" onClick={() => signOut()}>Logout</Button>
        </>
      )}
      </Paper>
    </Box>
  )
}
