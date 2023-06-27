import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../Layouts/Navbar/Navbar'

const Index = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Index