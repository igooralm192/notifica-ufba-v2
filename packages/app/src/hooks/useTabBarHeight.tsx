/*
  Custom tab bar height based on react navigation implementation:
  https://github.com/react-navigation/react-navigation/blob/54739828598d7072c1bf7b369659e3682db3edc5/packages/bottom-tabs/src/views/BottomTabBar.tsx
*/
import { Platform } from 'react-native'
import {
  EdgeInsets,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

const getPaddingBottom = (insets: EdgeInsets) =>
  Math.max(insets.bottom - Platform.select({ ios: 4, default: 0 }), 0)

export const getTabBarHeight = ({
  insets,
  dimensions,
}: {
  insets: EdgeInsets
  dimensions: { height: number; width: number }
}) => {
  const isLandscape = dimensions.width > dimensions.height
  const paddingBottom = getPaddingBottom(insets)

  if (Platform.OS === 'ios' && !Platform.isPad && isLandscape) {
    return 56 + paddingBottom
  }

  return 64 + paddingBottom
}

export const useTabBarHeight = (): number => {
  const insets = useSafeAreaInsets()
  const dimensions = useSafeAreaFrame()

  const tabBarHeight = getTabBarHeight({ insets, dimensions })

  return tabBarHeight
}
