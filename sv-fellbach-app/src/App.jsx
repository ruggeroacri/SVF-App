import React, { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import NewsScreen from './components/NewsScreen'
import TeamsScreen from './components/TeamsScreen'
import ScheduleScreen from './components/ScheduleScreen'
import ContactScreen from './components/ContactScreen'

export default function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch (page) {
      case 'news': return <NewsScreen />
      case 'teams': return <TeamsScreen />
      case 'schedule': return <ScheduleScreen />
      case 'contact': return <ContactScreen />
      default: return <HomeScreen navigate={setPage} />
    }
  }

  return (
    <div className="app-root">
      <main className="main">{renderPage()}</main>
      <nav className="bottom-nav">
        <button className={page==='home'?'active':''} onClick={() => setPage('home')}>Home</button>
        <button className={page==='news'?'active':''} onClick={() => setPage('news')}>News</button>
        <button className={page==='teams'?'active':''} onClick={() => setPage('teams')}>Teams</button>
        <button className={page==='schedule'?'active':''} onClick={() => setPage('schedule')}>Spielplan</button>
        <button className={page==='contact'?'active':''} onClick={() => setPage('contact')}>Kontakt</button>
      </nav>
    </div>
  )
}
