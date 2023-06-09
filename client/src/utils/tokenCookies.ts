import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { COOKIE_EXPIRATION_TIME, TOKEN_COOKIE } from '../utils/constants'

export function createTokenCookies (token: string) {
  setCookie(null, TOKEN_COOKIE, token, {
    maxAge: COOKIE_EXPIRATION_TIME,
    path: '/'
  })
}

export function removeTokenCookies () {
  destroyCookie(null, TOKEN_COOKIE)
}

export function getToken () {
  const cookies = parseCookies()
  return cookies[TOKEN_COOKIE]
}
