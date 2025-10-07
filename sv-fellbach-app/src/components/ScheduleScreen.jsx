import React, { useEffect, useState } from 'react'

export default function ScheduleScreen() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/schedule')
      .then(r => r.json())
      .then(data => { setMatches(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="screen">
      <h2>Spielplan</h2>
      {loading && <p>Lade Spielplan...</p>}
      {!loading && matches.length === 0 && <p>Keine Daten verfügbar.</p>}
      {matches.map((m, i) => (
        <div className="card" key={i}>
          <h4>{m.home} vs {m.away}</h4>
          <small>{m.date}</small>
          {m.result && <p>Ergebnis: {m.result}</p>}
        </div>
      ))}
    </div>
  )
}
