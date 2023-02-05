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
            width: 220,
            backgroundColor: 'white',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 36,
            paddingHorizontal: 16
          }}
        >

          <Spinner />

          <Spacer />

          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat_600SemiBold',
              marginTop: 8,
              textAlign: 'center'
            }}
          >
            {description}
          </Text>
        </View>
      </Pressable>
    </Modal>
  )
}
