import React from 'react'

export default function NewsScreen() {
  const news = [
    { id: 1, title: 'Sieg gegen TSV XY', date: '06.10.2025' },
    { id: 2, title: 'Neue Jugendtrainer', date: '03.10.2025' }
  ]

  return (
    <div className="screen">
      <h2>Aktuelles</h2>
      {news.map(n => (
        <div className="card" key={n.id}>
          <h4>{n.title}</h4>
          <small>{n.date}</small>
        </div>
      ))}
    </div>
  )
}
