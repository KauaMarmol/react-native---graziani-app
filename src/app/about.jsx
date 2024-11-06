import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Button, Image, Text, View } from 'react-native';

export default function About() {
    return (
        <View style={{
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: '#f7f8fc',
            padding: 20,
            paddingTop: 30,
        }}>
            <Text style={{
                fontSize: 32,
                fontWeight: '700',
                marginBottom: 40,
                color: '#6200EE',
                fontFamily: 'sans-serif',
                textAlign: 'center',
                textShadowColor: '#6200EE',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 8,
            }}>
                Sobre mim 🤔
            </Text>
            
            <Image 
                source={{ uri: 'https://avatars.githubusercontent.com/u/159555487?v=4' }}
                style={{
                    width: 180,
                    height: 180,
                    borderRadius: 90,
                    borderWidth: 4,
                    borderColor: '#6200EE',
                    marginBottom: 40,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 10,
                }} 
            />
            
            <Text style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#333',
                textAlign: 'center',
                lineHeight: 28,
                paddingHorizontal: 30,
                fontFamily: 'sans-serif',
                marginBottom: 40,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#e1e1e1',
                borderRadius: 15,
                paddingVertical: 18,
                marginHorizontal: 15,
                shadowColor: '#ccc',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 3,
            }}>
                Olá, me chamo Kauã Marmol Damasio e estou desenvolvendo este projeto para a matéria de DDM na escola Etec Prof. Milton Gazzetti de Presidente Venceslau com o auxílio do professor Graziani Zanfolin.
            </Text>
            
            <TouchableOpacity 
                onPress={() => { router.back() }} 
                style={{
                    backgroundColor: '#6200EE',
                    paddingVertical: 15, 
                    paddingHorizontal: 30, 
                    borderRadius: 12, 
                    marginTop: 30,
                    shadowColor: '#6200EE',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 5,
                    transition: 'all 0.3s ease', // Suaviza o efeito ao pressionar
                }}
                activeOpacity={0.8} // Efeito de "clique"
            >
                <Text style={{
                    color: '#fff', 
                    fontSize: 18, 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    letterSpacing: 1.2,
                }}>
                    Voltar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
