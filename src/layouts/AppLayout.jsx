import React from 'react'
import Mainav from '../components/Mainav'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
  return (
    <div>
      <Mainav/>
      <hr/>
      <Outlet/>
    </div>
  )
}

export default AppLayout
