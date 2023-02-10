import React from 'react'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'

import { Container, PictureImage, PictureImagePlaceholder } from './styles'

export interface PictureProps {
  loading: boolean
  pictureUrl: string | null
  size?: number
}

export const Picture: React.FC<PictureProps> = ({
  loading,
  pictureUrl,
  size = 100,
}) => {
  return (
    <Container style={{ width: size, height: size, borderRadius: size / 2 }}>
      {loading ? (
        <></>
      ) : !!pictureUrl ? (
        <PictureImage
          layout={Layout.duration(500)}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          source={{
            uri: pictureUrl,
            isNativelyInitialized: () => true,
          }}
          resizeMode="cover"
        />
      ) : (
        <Animated.View
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <PictureImagePlaceholder width={size/2} height={size/2} />
        </Animated.View>
      )}
    </Container>
  )
}
