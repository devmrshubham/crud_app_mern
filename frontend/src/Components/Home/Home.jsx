import React from 'react'
import Sidebar from './Sidebar'

import { Outlet } from 'react-router-dom'


const Home = () => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "250px auto" }} >
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Home
