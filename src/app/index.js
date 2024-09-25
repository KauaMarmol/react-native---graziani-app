import { StatusBar } from 'expo-status-bar';
import { Alert, BackHandler, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const tooglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
      // router.replace("/");
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App pronto para usar🎉</Text>
      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="black" />
        <TextInput style={styles.emailinput} placeholder="E-mail" value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="black" />
        <TextInput style={styles.emailinput} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry={passwordVisibility} />
        <Ionicons name={passwordVisibility ? "eye-off-outline" : "eye-outline"} size={20} color="black" onPress={tooglePasswordVisibility} />
      </View>

      <Button title="Entrar" onPress={handleEntrarSuper} color="#4caf50" />
      <Button title="Sobre" onPress={() => router.push("/about")} color="#6a1b9a" />
      <Button title="Sair do aplicativo" onPress={() => BackHandler.exitApp()} color="#d32f2f" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Cor de fundo suave
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    padding: 20, // Adiciona espaçamento nas laterais
  },
  title: {
    fontFamily: "regular",
    fontSize: 24, // Aumenta o tamanho da fonte
    fontWeight: 'bold', // Deixa o título em negrito
    color: '#333', // Cor do texto
  },
  inputbox: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1, // Linha embaixo dos campos
    borderBottomColor: '#ccc', // Cor da linha
    paddingBottom: 5, // Espaçamento interno inferior
  },
  emailinput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 20,
    paddingVertical: 10, // Adiciona espaçamento vertical
  },
  button: {
    width: "100%",
  },
});