/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { SwipeRatingProps, TapRatingProps } from 'react-native-ratings'

export const Rating: React.FC<SwipeRatingProps> = props => {
  const [value, setValue] = useState(String(props.startingValue))

  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={value => {
        setValue(value)
        props.onFinishRating!(Number(value))
      }}
      testID="swipe-rating"
    />
  )
}

export const AirbnbRating: React.FC<TapRatingProps> = props => {
  const [value, setValue] = useState(String(props.defaultRating))

  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={value => {
        setValue(value)
        props.onFinishRating!(Number(value))
      }}
      testID="tap-rating"
    />
  )
}
