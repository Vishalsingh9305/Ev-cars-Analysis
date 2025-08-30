import React from 'react'

export default function Navbar(){
  return (
    <header 
      className="navbar" 
      style={{
        background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
        color: 'white',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {/* Left side */}
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <strong style={{fontSize:18}}>⚡ EV Analytics</strong>
        <span style={{color:'rgba(255,255,255,0.85)'}}>Upload CSV, filter and explore</span>
      </div>

      {/* Right side */}
      <div style={{display:'flex', gap:16, alignItems:'center'}}>
        <div 
          style={{
            padding:'6px 14px',
            borderRadius:20,
            background:'rgba(255,255,255,0.2)',
            color:'white',
            fontWeight:500,
            fontSize:14,
            cursor:'pointer'
          }}
        >
          Demo
        </div>
        <div 
          style={{
            width:40,
            height:40,
            borderRadius:'50%',
            background:'white',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color:'#4f46e5',
            fontWeight:600,
            cursor:'pointer'
          }}
        >
          
        </div>
      </div>
    </header>
  )
}
