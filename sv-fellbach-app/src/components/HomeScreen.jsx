import React, { useEffect, useState } from 'react'

export default function HomeScreen({ navigate }) {
  const [nextMatch, setNextMatch] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/next-match')
      .then(r => r.json())
      .then(data => { setNextMatch(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="screen">
      <h1 className="title">SV Fellbach</h1>
      {loading && <p>Lade Spieldaten...</p>}
      {!loading && nextMatch && (
        <div className="card next-match">
          <h3>Nächstes Spiel</h3>
          <p><strong>{nextMatch.home || '—'}</strong> vs <strong>{nextMatch.away || '—'}</strong></p>
          <p>{nextMatch.date || 'Datum folgt'}</p>
          <p>{nextMatch.competition || ''}</p>
        </div>
      )}

      <div className="actions">
        <button onClick={() => navigate('news')}>News</button>
        <button onClick={() => navigate('teams')}>Teams</button>
      </div>
    </div>
  )
}
