import { useGenerateMessage, useGeneratePost } from '@/hooks/api'
import React, { useContext } from 'react'

export interface ExperimentPresenterContextData {
  generatePost: {
    loading: boolean
    generate(): Promise<void>
  }
  generateMessage: {
    loading: boolean
    generate(): Promise<void>
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

  const handleGeneratePost = async () => {
    await generatePost({})
  }
  const handleGenerateMessage = async () => {
    await generateMessage({})
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
