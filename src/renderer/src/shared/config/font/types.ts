export interface Font {
  display1: FontVariants
  display2: FontVariants
  title1: FontVariants
  title2: FontVariants
  headline1: FontVariants
  headline2: FontVariants
  body: FontVariants
  label: FontVariants
  caption: FontVariants
}

interface FontVariants {
  bold: FontStyle
  medium: FontStyle
  regular: FontStyle
}

interface FontStyle {
  fontSize: string
  fontWeight: number
}

export const fontCommon = {
  lineHeight: '130%',
  letterSpacing: '-2%'
} as const
