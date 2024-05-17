import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const PrivateRoutes = () => {
  const auth = localStorage.getItem('user')
  return auth ?
    <div>
      <Navbar />
      <Outlet />
    </div>
     :
    <Navigate to='/signin' />
}

export default PrivateRoutes
