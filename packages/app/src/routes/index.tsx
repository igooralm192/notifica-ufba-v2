import { useAuth } from '@/contexts/auth'
import { MeProvider } from '@/contexts/me'
import { MessagingProvider } from '@/contexts/messaging'
import { BottomTabsNavigator } from '@/routes/bottom-tabs'
import { AppNavigation } from '@/types/navigation'
import {
  CreatePostScreen,
  DisciplineGroupInfoScreen,
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  WelcomeScreen,
  DisciplineGroupTabsScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
  EditProfileScreen,
  CreateGroupScreen,
  SearchGroupsScreen,
  SearchGroupsSubscribeScreen,
  SearchDisciplinesScreen,
  SendFeedbackScreen,
  ExperimentScreen
} from '@/screens'
import { AuthState } from '@/store/auth/types'

import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator<AppNavigation>()

const Routes: React.FC = () => {
  const { state: authState } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState === AuthState.UNAUTHENTICATED ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Group>
      ) : authState === AuthState.AUTHENTICATED ? (
        <Stack.Screen name="AuthenticatedNavigator">
          {() => (
            <MeProvider>
              <MessagingProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="BottomTabsNavigator"
                    component={BottomTabsNavigator}
                  />

                  <Stack.Screen
                    name="DisciplineGroupTabsScreen"
                    component={DisciplineGroupTabsScreen}
                  />

                  <Stack.Screen
                    name="DisciplineGroupInfoScreen"
                    component={DisciplineGroupInfoScreen}
                    options={{ headerShown: false, presentation: 'modal' }}
                  />

                  <Stack.Screen
                    name="CreatePostScreen"
                    component={CreatePostScreen}
                  />

                  <Stack.Screen
                    name="CreateGroupScreen"
                    component={CreateGroupScreen}
                  />

                  <Stack.Screen
                    name="SearchDisciplinesScreen"
                    component={SearchDisciplinesScreen}
                    options={{ headerShown: false, presentation: 'modal' }}
                  />

                  <Stack.Screen
                    name="SearchGroupsScreen"
                    component={SearchGroupsScreen}
                    options={{ headerShown: false, presentation: 'modal' }}
                  />

                  <Stack.Screen
                    name="SearchGroupsSubscribeScreen"
                    component={SearchGroupsSubscribeScreen}
                    options={{ headerShown: false, presentation: 'modal' }}
                  />

                  <Stack.Screen
                    name="SendFeedbackScreen"
                    component={SendFeedbackScreen}
                  />

                  <Stack.Screen
                    name="EditProfileScreen"
                    component={EditProfileScreen}
                    />
                    
                    <Stack.Screen
                    name="ExperimentScreen"
                    component={ExperimentScreen}
                  />
                </Stack.Navigator>
              </MessagingProvider>
            </MeProvider>
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      )}

      <Stack.Screen
        name="LoadingScreen"
        component={SplashScreen}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Stack.Navigator>
  )
}

export default Routes
