import React from 'react'
import { View } from 'react-native'

export interface SpacerProps {
  d?: 'horizontal' | 'vertical'
  s?: number
}

const Spacer: React.FC<SpacerProps> = ({ d = 'vertical', s = 8 }) => {
  return (
    <View style={{ [`margin${d.charAt(0).toUpperCase() + d.slice(1)}`]: s }} />
  )
}

export default Spacer
