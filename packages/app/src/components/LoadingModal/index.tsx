import { Modal, ModalProps } from '@/components/Modal'
import { Spacer } from '@/components/Spacer'
import { Spinner } from '@/components/Spinner'

import { Text } from '@rneui/themed'
import React from 'react'
import { Pressable, View } from 'react-native'

export interface LoadingModalProps extends ModalProps {
  description: string
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  description,
  ...props
}) => {
  return (
    <Modal {...props}>
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 250,
            height: 200,
            backgroundColor: 'white',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <Spinner />

          <Spacer />

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Quicksand_600SemiBold',
            }}
          >
            {description}
          </Text>
        </View>
      </Pressable>
    </Modal>
  )
}
