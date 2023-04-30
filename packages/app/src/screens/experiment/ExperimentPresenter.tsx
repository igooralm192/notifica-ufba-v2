import { useGenerateMessage, useGeneratePost } from '@/hooks/api'
import React, { useContext } from 'react'

export interface ExperimentPresenterContextData {
  generatePost: {
    loading: boolean
    generate(disciplineGroupId: string): Promise<void>
  }
  generateMessage: {
    loading: boolean
    generate(disciplineGroupId: string): Promise<void>
  }
}

const ExperimentPresenterContext = React.createContext(
  {} as ExperimentPresenterContextData,
)

export const ExperimentPresenter = ({ children }: React.PropsWithChildren) => {
  const { isGenerating: isGeneratingPost, generate: generatePost } =
    useGeneratePost()
  const { isGenerating: isGeneratingMessage, generate: generateMessage } =
    useGenerateMessage()

  const handleGeneratePost = async (disciplineGroupId: string) => {
    await generatePost({ disciplineGroupId })
  }
  const handleGenerateMessage = async (disciplineGroupId: string) => {
    await generateMessage({ disciplineGroupId })
  }

  return (
    <ExperimentPresenterContext.Provider
      value={{
        generatePost: {
          loading: isGeneratingPost,
          generate: handleGeneratePost,
        },
        generateMessage: {
          loading: isGeneratingMessage,
          generate: handleGenerateMessage,
        },
      }}
    >
      {children}
    </ExperimentPresenterContext.Provider>
  )
}

export const withExperimentPresenter = (Component: React.FC) => {
  return (props: any) => (
    <ExperimentPresenter>
      <Component {...props} />
    </ExperimentPresenter>
  )
}

export const useExperimentPresenter = () =>
  useContext(ExperimentPresenterContext)
