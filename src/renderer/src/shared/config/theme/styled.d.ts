import 'styled-components'
import { Theme } from './types'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
