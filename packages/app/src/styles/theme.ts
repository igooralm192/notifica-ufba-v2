import { createTheme, Colors } from '@rneui/themed'
import { EdgeInsets } from 'react-native-safe-area-context'
export interface ITheme {
  mode: 'light' | 'dark'
  colors: Colors
  insets: EdgeInsets
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
    success: '#4ECC64',
    error: '#FF696A',
    info: '#93CFFF',
  },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
})

export { themeOptions }
