/**
 * Composing <Route> in React Router v6
 * https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f
 *
 * Upgrading from v5
 * https://reactrouter.com/docs/en/v6/upgrading/v5
 */
import { Routes, Route } from 'react-router-dom'

import EnhancedTable from '../pages/Products'
import SignIn from '../pages/Login'
import SignUp from '../pages/Register'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const RouteList = () => (
  <Routes>

    <Route
      path="/login"
      element={
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      }
    />

    <Route
      path="/register"
      element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      }
    />

    <Route
      path="/"
      element={
        <PrivateRoute>
          <EnhancedTable />
        </PrivateRoute>
      }
    />

    <Route path="*" element={<h1>404</h1>} />
  </Routes>
)
