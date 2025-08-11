import React from 'react'
import SimpleQRGenerator from './components/SimpleQRGenerator.tsx'
import './App.css'

const App = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans antialiased">
      <SimpleQRGenerator />
    </div>
  )
}

export default App
