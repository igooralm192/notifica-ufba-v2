import { useSendFeedback } from '@/hooks/api'

import React, { useContext } from 'react'

export interface SendFeedbackPresenterContextData {
  sending: boolean
  sendFeedback: (feedback: string) => Promise<void>
}

const SendFeedbackPresenterContext = React.createContext(
  {} as SendFeedbackPresenterContextData,
)

export const SendFeedbackPresenter: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { isSending, sendFeedback } = useSendFeedback()

  const handleSendFeedback = async (feedback: string) => {
    await sendFeedback({ feedback })
  }

  return (
    <SendFeedbackPresenterContext.Provider
      value={{
        sending: isSending,
        sendFeedback: handleSendFeedback,
      }}
    >
      {children}
    </SendFeedbackPresenterContext.Provider>
  )
}

export const withSendFeedbackPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <SendFeedbackPresenter>
        <Component {...props} />
      </SendFeedbackPresenter>
    )
  }
}

export const useSendFeedbackPresenter = () =>
  useContext(SendFeedbackPresenterContext)
