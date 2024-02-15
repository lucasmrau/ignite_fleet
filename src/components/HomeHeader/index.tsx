import React from 'react';
import { Container, Greeting, Message, Name, Picture } from './styles';
import { Power } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import theme from '../../theme';
import { useApp, useUser } from '@realm/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HomeHeader() {
    const user = useUser();
    const app = useApp();
    const insets = useSafeAreaInsets();

    const paddingTop = insets.top + 32

    function handleLogout(){
        app.currentUser?.logOut()
    }

  return (
    <Container style={{ paddingTop }}>
        <Picture source={{ uri: 'https://avatars.githubusercontent.com/u/82839108?v=4'}}/>
        <Greeting>
            <Message>
                Ola
            </Message>

            <Name>
                {user?.profile.name}
            </Name>
        </Greeting>

        <TouchableOpacity onPress={handleLogout}>
            <Power size={32} color={theme.COLORS.GRAY_400}/>
        </TouchableOpacity>
    </Container>
  );
}