export type AppNavigation = {
  // Unknown
  SplashScreen: undefined
  LoadingScreen: undefined

  // Unauthenticated
  WelcomeScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined

  // Authenticated
  AuthenticatedNavigator: undefined
  BottomTabsNavigator: undefined
  LastMessagesScreen: undefined
  DisciplinesScreen: undefined
  DisciplineGroupsScreen: undefined

  DisciplineGroupTabsScreen: {
    disciplineGroupId: string
    initialTab?: 'mural' | 'chat'
  }
  DisciplineGroupPostsScreen: { disciplineGroupId: string }
  DisciplineGroupMessagesScreen: { disciplineGroupId: string }

  DisciplineGroupInfoScreen: { disciplineGroupId: string }
}
