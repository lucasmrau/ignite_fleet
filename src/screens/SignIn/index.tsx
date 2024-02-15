import { Container, Title, Slogan } from './styles';
import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Realm, useApp } from '@realm/react'

GoogleSignin.configure({
  scopes:["email", "profile"],
  webClientId: WEB_CLIENT_ID
})

export  function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const app = useApp()

  async function handleGoogleSignIn(){
    try {
      setIsAuthenticating(true)
      const { idToken} = await GoogleSignin.signIn()

      if(idToken){
        const credentials = Realm.Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        Alert.alert("Entrar, nao foi possivel entrar con google.")
        setIsAuthenticating(false)
      }
      
    } catch (error) {
      setIsAuthenticating(false)
      console.error(error)
      Alert.alert("Entrar, nao foi possivel entrar con google.")
    }
  }

    return (
        <Container source={backgroundImg}>
        <Title>Ignite Fleet</Title>
  
        <Slogan>
          Gestão de uso de veículos
        </Slogan>

      <Button title='Entrar com o Google' isLoading={isAuthenticating} onPress={handleGoogleSignIn}/>
      </Container>
    );
  }