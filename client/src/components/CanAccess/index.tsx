import { ReactNode, useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'

interface ICanAccessProps {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

export function CanAccess ({ children }: ICanAccessProps) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}
