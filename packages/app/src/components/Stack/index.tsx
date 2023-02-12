/* eslint-disable react/prop-types */
import { Spacer } from '@/components/Spacer'
import React, { Fragment } from 'react'
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native'

export interface StackProps extends PressableProps {
  d?: 'horizontal' | 'vertical'
  s?: number
  style?: StyleProp<ViewStyle>
  children: React.ReactNode | React.ReactNode[]
}

function isArrayChildren(children: any): children is React.ReactNode[] {
  return Array.isArray(children)
}

export function Stack({
  d = 'vertical',
  s = 8,
  style,
  children = [],
  ...props
}: StackProps) {
  const getChildren = () => {
    if (isArrayChildren(children)) {
      return children
    }

    return [children]
  }

  const [first, ...restChildren] = getChildren()

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
      {React.cloneElement(first, { key: 'stack-child-1' })}

      {restChildren.map((child, i) => (
        <Fragment key={`stack-child-${i+2}`}>
          <Spacer d={d} s={s} />
          {child}
        </Fragment>
      ))}
    </Pressable>
  )
}
