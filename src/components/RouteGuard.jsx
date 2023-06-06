import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({children}) => {
    const token = Cookies.get("token")
  return (
    <div>
        {!token ? children : <Navigate to={'/'}/>}
    </div>
  )
}

export default RouteGuard