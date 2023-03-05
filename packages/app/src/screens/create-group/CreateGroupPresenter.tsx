import { useNavigation } from '@/helpers'
import { useCreateDisciplineGroup } from '@/hooks/api'
import { ICreateGroupFormValues } from '@/screens/create-group/CreateGroupScreen'

import React, { useContext } from 'react'

export interface CreateGroupPresenterContextData {
  creating: boolean
  createGroup: (data: ICreateGroupFormValues) => Promise<void>
}

const CreateGroupPresenterContext = React.createContext(
  {} as CreateGroupPresenterContextData,
)

export const CreateGroupPresenter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigation = useNavigation()

  const { isCreating, create: createGroup } = useCreateDisciplineGroup()

  const handleCreateGroup = async ({
    disciplineId,
    ...values
  }: ICreateGroupFormValues) => {
    await createGroup({ disciplineId, ...values })

    navigation.goBack()
  }

  return (
    <CreateGroupPresenterContext.Provider
      value={
        {
          creating: isCreating,
          createGroup: handleCreateGroup,
        }
      }
    >
      {children}
    </CreateGroupPresenterContext.Provider>
  )
}

export const withCreateGroupPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <CreateGroupPresenter>
        <Component {...props} />
      </CreateGroupPresenter>
    )
  }
}

export const useCreateGroupPresenter = () =>
  useContext(CreateGroupPresenterContext)
