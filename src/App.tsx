import React, { useEffect, useState } from 'react'
import SimpleQRGenerator from './components/SimpleQRGenerator.tsx'
import './App.css'

const App = (): React.JSX.Element => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  return (
    <div className="min-h-screen font-sans antialiased">
      <SimpleQRGenerator />
    </div>
  )
}

export default App
