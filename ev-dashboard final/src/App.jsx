import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

export default function App() {
  const [data, setData] = useState(null)

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="content">
          <Dashboard data={data} setData={setData} />
        </div>
      </div>
    </div>
  )
}