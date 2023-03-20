import { IDiscipline, IDisciplineGroup } from '@shared/entities'

export type AppNavigation = {
  // Unknown
  SplashScreen: undefined
  LoadingScreen: undefined

  // Unauthenticated
  WelcomeScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  ForgotPasswordScreen: undefined
  ResetPasswordScreen: {
    token?: string
  }

  // Authenticated
  AuthenticatedNavigator: undefined
  BottomTabsNavigator: undefined
  LastMessagesScreen: undefined
  DisciplinesScreen: undefined
  DisciplineGroupsScreen: undefined
  ProfileScreen: undefined
  CreateGroupScreen: {
    discipline?: IDiscipline
  }
  CreatePostScreen: {
    discipline?: IDiscipline
    disciplineGroup?: IDisciplineGroup
  }
  
  SearchDisciplinesScreen: {
    onDisciplineSelected: (discipline: IDiscipline) => void
  }

  SearchGroupsScreen: {
    onDisciplineGroupSelected: (
      discipline: IDiscipline,
      disciplineGroup: IDisciplineGroup,
    ) => void
  }

  SearchGroupsSubscribeScreen: {
    onDisciplineGroupSelected: (
      discipline: IDiscipline,
      disciplineGroup: IDisciplineGroup,
    ) => void
  }

  SendFeedbackScreen: undefined

  DisciplineGroupTabsScreen: {
    disciplineGroupId: string
    initialTab?: 'mural' | 'chat'
  }
  DisciplineGroupPostsScreen: { disciplineGroupId: string }
  DisciplineGroupMessagesScreen: { disciplineGroupId: string }
  DisciplineGroupInfoScreen: { disciplineGroupId: string }
  EditProfileScreen: { userId: string }
}
