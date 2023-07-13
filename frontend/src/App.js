import React from 'react'
import Home from './Components/Home/Home'
import Add from './Pages/Category/Add'
import View from './Pages/Category/View'
import { Route, Routes } from 'react-router-dom'
import ContextHolder from './Context/ContextHolder'
import Edit from './Pages/Category/Edit'



const App = () => {
  return (
    <ContextHolder>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/home/category/add" element={<Add />} />
          <Route path="/home/category/view" element={<View />} />
          <Route path="/home/edit/:id?" element={<Edit />} />
        </Route>
      </Routes>
    </ContextHolder>
  )
}

export default App
