import { useNavigation } from '@/helpers'
import { useCreateDisciplineGroupPost } from '@/hooks/api'

import React, { useContext } from 'react'
import Toast from 'react-native-toast-message'

export interface CreatePostPresenterContextData {
  creating: boolean
  createPost: (disciplineGroupId: string, content: string) => Promise<void>
}

const CreatePostPresenterContext = React.createContext(
  {} as CreatePostPresenterContextData,
)

export const CreatePostPresenter: React.FC = ({ children }) => {
  const navigation = useNavigation()

  const { isCreating, create } = useCreateDisciplineGroupPost()

  const handleCreatePost = async (
    disciplineGroupId: string,
    content: string,
  ) => {
    await create({ disciplineGroupId, content })

    navigation.goBack()
  }

  return (
    <CreatePostPresenterContext.Provider
      value={{
        creating: isCreating,
        createPost: handleCreatePost,
      }}
    >
      {children}
    </CreatePostPresenterContext.Provider>
  )
}

export const withCreatePostPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <CreatePostPresenter>
        <Component {...props} />
      </CreatePostPresenter>
    )
  }
}

export const useCreatePostPresenter = () =>
  useContext(CreatePostPresenterContext)
