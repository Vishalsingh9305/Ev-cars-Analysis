import React, { useMemo, useState } from 'react'
import Papa from 'papaparse'
import KPIs from './dashboard/KPIs'
import Charts from './dashboard/Charts'
import DataTable from './dashboard/DataTable'

export default function Dashboard({ data, setData }){
  const [rawCsv, setRawCsv] = useState(null)

  const handleFile = (file) => {
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setRawCsv(results.data)
        setData(results.data)
      }
    })
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr', gap:16}}>
      <div className="card upload">
        <div>
          <input id="file" type="file" accept=".csv" onChange={(e)=>handleFile(e.target.files[0])} />
          <div style={{marginTop:8, color:'#6b7280'}}>Upload the provided Electric_Vehicle_Population_Data.csv to populate the dashboard.</div>
        </div>
      </div>

      <KPIs data={rawCsv || data} />

      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
        <Charts data={rawCsv || data} />
        <div>
          <div className="card">
            <h3>Distribution</h3>
            <p style={{marginTop:8, color:'#6b7280'}}>Quick breakdowns and pie charts shown here.</p>
          </div>
          <div className="card" style={{marginTop:12}}>
            <h3>Data Table</h3>
            <DataTable data={rawCsv || data} />
          </div>
        </div>
      </div>

      <div className="footer">CSV-driven insights</div>
    </div>
  )
}