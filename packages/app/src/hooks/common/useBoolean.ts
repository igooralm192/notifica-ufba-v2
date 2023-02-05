import { useState } from 'react'

export type IUseBooleanHookData = {
  value: boolean
  on: () => void
  off: () => void
}

export const useBoolean = (initialValue = false): IUseBooleanHookData => {
  const [bool, setBool] = useState(initialValue)

  return {
    value: bool,
    on: () => setBool(true),
    off: () => setBool(false),
  }
}
