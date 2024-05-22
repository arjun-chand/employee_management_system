import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import Employees from './components/Employees/Employees'
import Login from './components/user/Login'
import Signup from './components/user/signup'
import EmployeeDetails from './components/Employees/EmployeeDetails'
import AddEmployee from './components/Employees/AddEmployee'
import UserProfile from './components/user/UserProfile'
import Settings from './components/settings/Settings'
import UpdatePassword from './components/user/UpdatePassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path ="/" element={<Employees/>}/>
            <Route path ="/employeeDetails/:id" element={<EmployeeDetails/>}/>
            <Route path ="/addEmployee" element ={<AddEmployee/>}/>
            <Route path ="/profile" element = {<UserProfile/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/updatePassword' element={<UpdatePassword/>}/>
          </Route>

          <Route path ="/signin" element={<Login/>}/>
          <Route path ="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
