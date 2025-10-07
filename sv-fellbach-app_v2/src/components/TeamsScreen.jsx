import React from 'react'

export default function TeamsScreen() {
  const teams = ['1. Mannschaft', 'U19', 'U17', 'U15']
  return (
    <div className="screen">
      <h2>Teams</h2>
      {teams.map(t => (
        <div className="card" key={t}>
          <div className="row">
            <span>{t}</span>
            <button>Details</button>
          </div>
        </div>
      ))}
    </div>
  )
}
