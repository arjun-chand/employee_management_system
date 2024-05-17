import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const PrivateRoutes = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  return token ?
    <div>
      <Navbar />
      <Outlet />
    </div>
     :
    <Navigate to='/signin' />
}

export default PrivateRoutes
