import '@testing-library/jest-native/extend-expect'

// @ts-ignore
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

// @ts-ignore
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: jest.fn(({ children }) => children),
}))

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('@expo-google-fonts/quicksand', () => ({
  useFonts: () => [true],
}))
