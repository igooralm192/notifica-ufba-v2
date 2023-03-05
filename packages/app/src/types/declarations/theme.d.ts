import { ITheme } from '@/styles/theme'

declare module 'styled-components/native' {
  export interface DefaultTheme extends ITheme {}
}

declare module '@rneui/themed' {
  export interface Theme {
    insets: EdgeInsets
  }

  export interface Colors {
    info: string
  }
}


