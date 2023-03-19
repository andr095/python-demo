import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

interface IPrivateRoute {
  permissions?: string[]
  roles?: string[]
  redirectTo?: string
  children: ReactNode
}

export function PrivateRoute ({
  redirectTo = '/login',
  children
}: IPrivateRoute) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  return <>{children}</>
}
