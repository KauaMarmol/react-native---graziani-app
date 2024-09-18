import { router } from 'expo-router';
import {Button, Text, View} from 'react-native';

export default function About() {
    return (
        <View style={{flex:  1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Me chamo Kauã Marmol e estou desenvolvendo este projeto para a matéria de DDM na escola Etec Prof. Milton Gazzetti com o professor Graziani Zanfolin</Text>
        <Button title="Voltar" onPress={() => {router.replace("/")}} />
        </View>
    );
}