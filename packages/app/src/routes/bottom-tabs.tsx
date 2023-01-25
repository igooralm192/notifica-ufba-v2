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
  const { theme } = useTheme()

  const { user } = useMe()

  const insets = useSafeAreaInsets()

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          position: 'absolute',
          // top: 20,
          bottom: insets.bottom + 20,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 16,
          borderTopColor: '#F5F5F5',
          borderColor: '#F5F5F5',
          borderTopWidth: 2,
          borderWidth: 2,
          height: 70,
          paddingBottom: 0,
        },
        tabBarItemStyle: { padding: 12 },
        tabBarLabelStyle: {
          fontFamily: 'Quicksand_700Bold',
          fontSize: 10,
        },
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
