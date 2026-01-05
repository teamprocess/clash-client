import { css } from 'styled-components'
import { fontCommon, Font as FontType } from './types'

const fontData: FontType = {
  display1: {
    bold: { fontSize: '2.25rem', fontWeight: 700 },
    medium: { fontSize: '2.25rem', fontWeight: 500 },
    regular: { fontSize: '2.25rem', fontWeight: 400 }
  },
  display2: {
    bold: { fontSize: '2rem', fontWeight: 700 },
    medium: { fontSize: '2rem', fontWeight: 500 },
    regular: { fontSize: '2rem', fontWeight: 400 }
  },
  title1: {
    bold: { fontSize: '1.75rem', fontWeight: 700 },
    medium: { fontSize: '1.75rem', fontWeight: 500 },
    regular: { fontSize: '1.75rem', fontWeight: 400 }
  },
  title2: {
    bold: { fontSize: '1.5rem', fontWeight: 700 },
    medium: { fontSize: '1.5rem', fontWeight: 500 },
    regular: { fontSize: '1.5rem', fontWeight: 400 }
  },
  headline1: {
    bold: { fontSize: '1.25rem', fontWeight: 700 },
    medium: { fontSize: '1.25rem', fontWeight: 500 },
    regular: { fontSize: '1.25rem', fontWeight: 400 }
  },
  headline2: {
    bold: { fontSize: '1.125rem', fontWeight: 700 },
    medium: { fontSize: '1.125rem', fontWeight: 500 },
    regular: { fontSize: '1.125rem', fontWeight: 400 }
  },
  body: {
    bold: { fontSize: '1rem', fontWeight: 700 },
    medium: { fontSize: '1rem', fontWeight: 500 },
    regular: { fontSize: '1rem', fontWeight: 400 }
  },
  label: {
    bold: { fontSize: '0.875rem', fontWeight: 700 },
    medium: { fontSize: '0.875rem', fontWeight: 500 },
    regular: { fontSize: '0.875rem', fontWeight: 400 }
  },
  caption: {
    bold: { fontSize: '0.75rem', fontWeight: 700 },
    medium: { fontSize: '0.75rem', fontWeight: 500 },
    regular: { fontSize: '0.75rem', fontWeight: 400 }
  }
}

const fontHelper = (style: { fontSize: string; fontWeight: number }) => css`
  font-size: ${style.fontSize};
  font-weight: ${style.fontWeight};
  line-height: ${fontCommon.lineHeight};
  letter-spacing: ${fontCommon.letterSpacing};
`

export const Font = Object.assign(fontHelper, fontData)
