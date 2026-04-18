import React from 'react'
import { Outlet } from 'react-router-dom'

const Educator = () => {
  return (
    <>
    <h1>Educator Page</h1>
      {
        <Outlet />
      }
    </>
  )
}

export default Educator