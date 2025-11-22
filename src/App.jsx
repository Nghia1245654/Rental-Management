import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/index.jsx'
import React from 'react'
import Settings from './pages/Settings/index.jsx'
import RoomsManagement from './pages/RoomsManagement/index.jsx'
import BillsManagement from './pages/BillsManagement/index.jsx'
function App() {

  return (
    <>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="settings" element={<Settings />} />
          <Route path="RoomsManagement" element={<RoomsManagement />} />
          <Route path="bills" element={<BillsManagement />} />

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
