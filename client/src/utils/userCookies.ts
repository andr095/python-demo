import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { COOKIE_EXPIRATION_TIME, USER_COOKIE } from '../utils/constants'

export function createUserCookies (userData: string) {
  setCookie(null, USER_COOKIE, userData, {
    maxAge: COOKIE_EXPIRATION_TIME,
    path: '/'
  })
}

export function removeUserCookies () {
  destroyCookie(null, USER_COOKIE)
}

export function getUser () {
  const cookies = parseCookies()
  if (cookies[USER_COOKIE]) return JSON.parse(cookies[USER_COOKIE])
  return cookies[USER_COOKIE]
}
