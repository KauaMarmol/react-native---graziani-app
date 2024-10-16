import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import {Button, Image, Text, View} from 'react-native';

export default function About() {
    return (
        <View style={{flex:  1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#6200EE',
            fontFamily: 'sans-serif',
        }}>Sobre mim</Text>
        <Image 
                source={{ uri: 'https://avatars.githubusercontent.com/u/159555487?v=4' }}
                style={{ 
                    width: 150, 
                    height: 150, 
                    borderRadius: 75,
                    marginBottom: 30
                }} 
            />
        <Text style={{ 
            fontSize: 18, 
            fontWeight: '500', 
            color: '#333', 
            textAlign: 'center', 
            lineHeight: 26, 
            paddingHorizontal: 20, 
            fontFamily: 'sans-serif',
            marginBottom: 20,
            borderWidth: 2,
            borderColor: '#6959CD',
            borderRadius: 10,
            paddingVertical: 5,
            margin: 10,
        }}>
            Olá, me chamo Kauã Marmol Damasio e estou desenvolvendo este projeto para a matéria de DDM na escola Etec Prof. Milton Gazzetti de Presidente Venceslau com o auxílio do professor Graziani Zanfolin.
        </Text>
        <TouchableOpacity 
                onPress={() => {router.back()}} 
                style={{
                    backgroundColor: '#6200EE',
                    paddingVertical: 10, 
                    paddingHorizontal: 20, 
                    borderRadius: 5, 
                }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}