'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Dashboard from './components/Dashboard'
import TestSelection from './components/TestSelection'
import TestInterface from './components/TestInterface'
import Results from './components/Results'
import Profile from './components/Profile'
import Navigation from './components/Navigation'

const Header = dynamic(() => import('./components/Header'), { ssr: false })

type Screen = 'dashboard' | 'tests' | 'test-interface' | 'results' | 'profile'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard')
  const [isGuest, setIsGuest] = useState(false)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard isGuest={isGuest} onStartTest={() => setCurrentScreen('tests')} />
      case 'tests':
        return <TestSelection isGuest={isGuest} onStartTest={() => setCurrentScreen('test-interface')} onBack={() => setCurrentScreen('dashboard')} />
      case 'test-interface':
        return <TestInterface onComplete={() => setCurrentScreen('results')} onBack={() => setCurrentScreen('tests')} />
      case 'results':
        return <Results isGuest={isGuest} onReturnHome={() => setCurrentScreen('dashboard')} />
      case 'profile':
        return <Profile isGuest={isGuest} onToggleGuest={() => setIsGuest(!isGuest)} />
      default:
        return <Dashboard isGuest={isGuest} onStartTest={() => setCurrentScreen('tests')} />
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header isGuest={isGuest} />
      <div className="pb-20">
        {renderScreen()}
      </div>
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </main>
  )
}
