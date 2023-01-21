import WelcomePNG from '@/assets/welcome.png'
import { useNavigation } from '@/helpers'

import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  Container,
  Title,
  Subtitle,
  ImageContainer,
  WelcomeImage,
  ButtonsContainer,
  ButtonContainer,
  LoginButton,
  RegisterButton,
} from './WelcomeStyles'

const WelcomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const navigateToLogin = () => navigation.navigate('LoginScreen')
  const navigateToRegister = () => navigation.navigate('RegisterScreen')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Title>Bem vindo!</Title>

        <Subtitle>
          Fique por dentro das últimas mensagens postadas pelos seus
          professores!
        </Subtitle>

        <ImageContainer>
          <WelcomeImage source={WelcomePNG} />
        </ImageContainer>

        <ButtonsContainer>
          <ButtonContainer>
            <LoginButton title="Entrar" onPress={navigateToLogin} />
          </ButtonContainer>
          <ButtonContainer>
            <RegisterButton title="Cadastrar" onPress={navigateToRegister} />
          </ButtonContainer>
        </ButtonsContainer>
      </Container>
    </SafeAreaView>
  )
}

export default WelcomeScreen
