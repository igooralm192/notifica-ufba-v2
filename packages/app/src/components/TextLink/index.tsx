import React from 'react'
import { Text, Linking } from 'react-native'

interface TextLinkProps {
  children: string
}

export function TextLink({ children }: TextLinkProps) {
  const splitText = children.split(' ')

  const textWithLinks = splitText.map((word, index) => {
    // check if word is a URL
    if (word.match(/^(http|https):\/\/[^\s$.?#].[^\s]*$/gm)) {
      return (
        <Text key={index}>
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL(word)}
          >
            {word}
          </Text>{' '}
        </Text>
      )
    } else {
      return <Text key={index}>{word} </Text>
    }
  })

  return <Text>{textWithLinks}</Text>
}
