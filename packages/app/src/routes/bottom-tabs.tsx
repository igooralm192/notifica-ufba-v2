import { useMe } from '@/contexts/me'
import {
  DisciplineGroupsScreen,
  DisciplinesScreen,
  LastMessagesScreen,
  ProfileScreen,
} from '@/screens'
import { AppNavigation } from '@/types/navigation'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

const BottomTab = createBottomTabNavigator<AppNavigation>()

export const BottomTabsNavigator = () => {
  const { user } = useMe()
  const { theme } = useTheme()

  const insets = useSafeAreaInsets()

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: 'white',
          borderTopColor: '#F5F5F5',
          borderTopWidth: 2,
          height: insets.bottom + 64,
        },
        tabBarItemStyle: {
          padding: 12,
        },
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="DisciplineGroupsScreen"
        options={{
          title: 'Turmas',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="menu-book"
              color={color}
              size={size + 2}
              style={{ marginTop: -4 }}
            />
          ),
        }}
        component={DisciplineGroupsScreen}
      />
      {user?.type === 'STUDENT' && (
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
      )}
      <BottomTab.Screen
        name="DisciplinesScreen"
        options={{
          title: 'Disciplinas',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="subject"
              color={color}
              size={size}
              style={{ marginTop: -4 }}
            />
          ),
        }}
        component={DisciplinesScreen}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="person-pin"
              color={color}
              size={size}
              style={{ marginTop: -2 }}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  )
}
