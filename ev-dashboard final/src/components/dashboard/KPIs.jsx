import React, { useMemo } from 'react'

export default function KPIs({ data }) {
  const stats = useMemo(() => {
    if (!data || data.length === 0) return null
    const total = data.length

    // Count by Make
    const byMake = {}
    const byModel = {}
    data.forEach(r => {
      const make = r.Make || r.make || 'Unknown'
      const model = r.Model || r.model || 'Unknown'
      byMake[make] = (byMake[make] || 0) + 1
      byModel[model] = (byModel[model] || 0) + 1
    })

    const topMake = Object.entries(byMake).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'N/A'
    const topModel = Object.entries(byModel).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'N/A'
    const uniqueMakes = Object.keys(byMake).length

    return { total, uniqueMakes, topMake, topModel }
  }, [data])

  if (!stats) return null

  return (
    <div className="kpi-row">
      <div className="kpi">
        <div style={{color:'#6b7280'}}>Total Records</div>
        <div style={{fontSize:24, marginTop:6}}>{stats.total}</div>
      </div>
      <div className="kpi">
        <div style={{color:'#6b7280'}}>Unique Car Makes</div>
        <div style={{fontSize:24, marginTop:6}}>{stats.uniqueMakes}</div>
      </div>
      <div className="kpi">
        <div style={{color:'#6b7280'}}>Most Common Make</div>
        <div style={{fontSize:24, marginTop:6}}>{stats.topMake}</div>
      </div>
      <div className="kpi">
        <div style={{color:'#6b7280'}}>Most Popular Model</div>
        <div style={{fontSize:24, marginTop:6}}>{stats.topModel}</div>
      </div>
    </div>
  )
}
