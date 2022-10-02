import { IDiscipline, IDisciplineGroup } from "@shared/entities";

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
  CreatePostScreen: {
    discipline?: IDiscipline
    disciplineGroup?: IDisciplineGroup
  }
  ListGroupsScreen: {
    onDisciplineGroupSelected: (discipline: IDiscipline, disciplineGroup: IDisciplineGroup) => void
  }

  DisciplineGroupTabsScreen: {
    disciplineGroupId: string
    initialTab?: 'mural' | 'chat'
  }
  DisciplineGroupPostsScreen: { disciplineGroupId: string }
  DisciplineGroupMessagesScreen: { disciplineGroupId: string }

  DisciplineGroupInfoScreen: { disciplineGroupId: string }
}
