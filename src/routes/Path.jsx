import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import CreateContact from '../pages/CreateContact'
import RouteGuard from '../components/RouteGuard'
import LoginGuard from '../components/LoginGuard'

const Path = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LoginGuard><Dashboard/></LoginGuard>}/>
            <Route path='/register' element={<RouteGuard><Register/></RouteGuard>}/>
            <Route path='/login' element={<RouteGuard><Login/></RouteGuard>}/>
            <Route path='/create' element={<LoginGuard><CreateContact/></LoginGuard>}/>
        </Routes>
    </div>
  )
}

export default Path