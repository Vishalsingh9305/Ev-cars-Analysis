import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#4f46e5','#06b6d4','#f97316','#10b981','#ef4444','#8b5cf6','#f59e0b']

export default function Charts({ data }){
  // Group by year
  const byYear = useMemo(()=>{
    if (!data) return []
    const map = {}
    data.forEach(r=>{
      const yr = r.Year || r['Model Year'] || r['Registration Year'] || r['Manufacture Year'] || 'Unknown'
      map[yr] = (map[yr]||0) + 1
    })
    return Object.entries(map).map(([k,v])=>({ year:k, count:v }))
      .sort((a,b)=> parseInt(a.year) - parseInt(b.year))  // sort numerically
  }, [data])

  // Group by car make (brand)
  const byMake = useMemo(()=>{
    if (!data) return []
    const map = {}
    data.forEach(r=>{
      const make = r.Make || r['Make of Vehicle'] || r.Brand || 'Unknown'
      map[make] = (map[make]||0) + 1
    })
    return Object.entries(map).map(([k,v])=>({ name:k, value:v }))
      .sort((a,b)=>b.value-a.value)  // top selling first
      .slice(0,10)                   // show top 10 brands
  }, [data])

  if (!data) return (
    <div className="card">
      <h3>No data yet</h3>
      <p style={{color:'#6b7280'}}>Upload the CSV to generate charts.</p>
    </div>
  )

  return (
    <div style={{display:'grid', gap:16}}>
      {/* Bar chart by Year */}
      <div className="card" style={{height:300}}>
        <h3>EV registrations by Year</h3>
        <div style={{width:'100%', height:240}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byYear}>
              <XAxis dataKey="year" tick={{fontSize:12}} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie chart by Car Make */}
      <div className="card" style={{height:300}}>
        <h3>Top Car Makes by Sales</h3>
        <div style={{width:'100%', height:220}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byMake} dataKey="value" nameKey="name" outerRadius={80}>
                {byMake.map((entry, idx) => (
                  <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
