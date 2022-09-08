import { AppNavigation } from '@/types/navigation'
import {
  NavigationProp,
  useNavigation as useDefaultNavigation,
} from '@react-navigation/native'

export const useNavigation = () =>
  useDefaultNavigation<NavigationProp<AppNavigation>>()
