import { useState, useEffect } from 'react'
import { lightTheme, darkTheme, Theme } from '@/shared/config/theme'

type ClashTheme = 'light' | 'dark'

export const useTheme = () => {
  const [mode, setMode] = useState<ClashTheme>(() => {
    const saved = localStorage.getItem('clash-theme')
    return (saved as ClashTheme) || 'dark'
  })

  const theme: Theme = mode === 'light' ? lightTheme : darkTheme

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    localStorage.setItem('clash-theme', mode)
  }, [mode])

  return { theme, toggleTheme }
}
