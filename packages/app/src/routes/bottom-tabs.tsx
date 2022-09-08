import { useTabBarHeight } from '@/hooks'
import {
  DisciplineGroupsScreen,
  DisciplinesScreen,
  LastMessagesScreen,
} from '@/screens'
import { AppNavigation } from '@/types/navigation'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@rneui/themed'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const BottomTab = createBottomTabNavigator<AppNavigation>()

export const BottomTabsNavigator = () => {
  const { theme } = useTheme()
  const tabBarHeight = useTabBarHeight()

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { height: tabBarHeight },
        tabBarItemStyle: { padding: 12 },
      }}
    >
      <BottomTab.Screen
        name="DisciplineGroupsScreen"
        options={{
          title: 'Turmas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
        component={DisciplineGroupsScreen}
      />
      <BottomTab.Screen
        name="LastMessagesScreen"
        options={{
          title: 'Mensagens',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message" color={color} size={size} />
          ),
        }}
        component={LastMessagesScreen}
      />
      <BottomTab.Screen
        name="DisciplinesScreen"
        options={{
          title: 'Disciplinas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="subject" color={color} size={size} />
          ),
        }}
        component={DisciplinesScreen}
      />
    </BottomTab.Navigator>
  )
}
