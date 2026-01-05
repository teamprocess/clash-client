import { ThemeProvider } from 'styled-components'
import { useTheme } from '@/shared/lib/useTheme'
import { GlobalStyle } from './styles/GlobalStyle'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <button onClick={toggleTheme}>테마 전환</button>
      </div>
    </ThemeProvider>
  )
}

export default App
