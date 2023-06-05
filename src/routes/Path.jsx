import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import CreateContact from '../pages/CreateContact'

const Path = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/create' element={<CreateContact/>}/>
        </Routes>
    </div>
  )
}

export default Path