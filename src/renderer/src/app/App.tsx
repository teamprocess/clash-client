import { ThemeProvider } from 'styled-components'
import { useTheme } from '@/shared/lib/useTheme'
import { GlobalStyle } from './styles/GlobalStyle'
import styled from 'styled-components'
import { Font } from '@/shared/config/font'

const Title = styled.h1`
  ${Font(Font.title1.bold)}
`

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Title>Clash</Title>
        <button onClick={toggleTheme}>테마 전환</button>
      </div>
    </ThemeProvider>
  )
}

export default App
