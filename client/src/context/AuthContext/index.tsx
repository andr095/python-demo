import { AxiosError } from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CustomizedSnackbars, { SnackBarProps } from '../../components/SnackBar'

import { api } from '../../services/api'
import { setAuthorizationHeader } from '../../services/interceptors'
import { createTokenCookies, getToken, removeTokenCookies } from '../../utils/tokenCookies'
import { createUserCookies, getUser, removeUserCookies } from '../../utils/userCookies'

interface User {
  email: string
  id: number
  productName?: string
  selected?: number[]
}

interface SignInCredentials {
  email: string
  password: string,
  username?: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>,
  signUp: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
  user: User
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(getUser())
  const [bar, setBar] = useState<SnackBarProps>({
    message: '',
    isOpen: false,
    type: 'success'
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = getToken()
  const isAuthenticated = Boolean(token)

  const errorHandler = (err: AxiosError) => {
    if (err.response) {
      setBar({
        type: 'error',
        message: err.response.data.message[0].error as string,
        isOpen: !bar.isOpen
      })
    }
  }

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/auth/login/', { email, password })
      const { token, id } = response.data.data
      createTokenCookies(token)
      createUserCookies(JSON.stringify({ email, id }))
      setUser({ email, id })
      setAuthorizationHeader(api.defaults, token)
    } catch (error) {
      const err = error as AxiosError
      errorHandler(err)
      return err
    }
  }

  async function signUp ({ email, password, username }: SignInCredentials) {
    try {
      await api.post('/auth/register/', { email, password, username })
      setBar({
        type: 'success',
        message: 'Succesfully created account !',
        isOpen: true
      })
    } catch (error) {
      const err = error as AxiosError
      errorHandler(err)
      return err
    }
  }

  function signOut (pathname = '/login') {
    removeTokenCookies()
    removeUserCookies()
    setUser(null)
    navigate(pathname)
  }

  useEffect(() => {
    if (!token) signOut(pathname)
  }, [pathname, token])

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: user as User,
      signIn,
      signUp,
      signOut
    }}>
      <CustomizedSnackbars {...bar} />
      {children}
    </AuthContext.Provider>
  )
}
