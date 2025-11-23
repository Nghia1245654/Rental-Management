import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/index.jsx'
import React from 'react'
import Settings from './pages/Settings/index.jsx'
import RoomsManagement from './pages/RoomsManagement/index.jsx'
import BillsManagement from './pages/BillsManagement/index.jsx'
import { Toaster } from 'react-hot-toast'
import Tenants from './pages/Tenants/index.jsx'
import DashboardManagement from './pages/Dashboard/index.jsx'
function App() {

  return (
    <>
    <BrowserRouter>
          <Toaster  className="top-20 right-20" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="settings" element={<Settings />} />
          <Route path="RoomsManagement" element={<RoomsManagement />} />
          <Route path="bills" element={<BillsManagement />} />
          <Route path="dashboard" element={<DashboardManagement />} />
          <Route path="tenants" element={<Tenants />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
