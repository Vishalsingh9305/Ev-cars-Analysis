import React, { useMemo, useState } from 'react'

export default function DataTable({ data }){
  const [filter, setFilter] = useState('')
  const [limit, setLimit] = useState(50)

  const rows = useMemo(()=>{
    if (!data) return []
    const f = filter.toLowerCase()
    return data.filter(r=>{
      if (!f) return true
      return (r.Make || '').toLowerCase().includes(f) ||
             (r.Model || '').toLowerCase().includes(f) ||
             (r.State || r['Registration State'] || '').toLowerCase().includes(f)
    }).slice(0, limit)
  }, [data, filter, limit])

  if (!data) return <div style={{color:'#6b7280'}}>No data uploaded yet.</div>

  return (
    <div>
      <div className="filter-row">
        <input placeholder="Filter by make, model or state" value={filter} onChange={(e)=>setFilter(e.target.value)} />
        <label>Rows:
          <select value={limit} onChange={(e)=>setLimit(Number(e.target.value))} style={{marginLeft:8}}>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>State</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx)=>(
              <tr key={idx}>
                <td>{r.Make || r.make || r['Make/Manufacturer']}</td>
                <td>{r.Model || r.model}</td>
                <td>{r.State || r['Registration State'] || r['State/Province']}</td>
                <td>{r.Year || r['Model Year']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}