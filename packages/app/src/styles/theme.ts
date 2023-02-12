import { createTheme, Colors } from '@rneui/themed'

export interface ITheme {
  mode: 'light' | 'dark'
  colors: Colors
}

const themeOptions = createTheme({
  lightColors: {
    primary: '#71de7c',
    secondary: '#1C2633',
    grey0: '#FAFAFA',
    grey1: '#F5F5F5',
    grey2: '#E9E9E9',
    grey5: '#5C5C5C',
    black: '#484848',
    error: '#FF696A',
  },
})

export { themeOptions }
