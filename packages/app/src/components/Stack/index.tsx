import { Spacer } from '@/components/Spacer'
import React from 'react'
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native'

export interface StackProps extends PressableProps {
  d?: 'horizontal' | 'vertical'
  s?: number
  style?: StyleProp<ViewStyle>
  children: React.ReactNode[]
}

export const Stack: React.FC<StackProps> = ({
  d = 'vertical',
  s = 8,
  style,
  children = [],
  ...props
}) => {
  const [first, ...restChildren] = children

  return (
    <Pressable
      {...props}
      style={[
        {
          flexDirection: d === 'horizontal' ? 'row' : 'column',
        },
        style,
      ]}
    >
      {first}

      {restChildren.map(child => (
        <>
          <Spacer d={d} s={s} />
          {child}
        </>
      ))}
    </Pressable>
  )
}
