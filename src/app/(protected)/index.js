import { Button, Text, View } from "react-native";
import { useAuth } from "../hooks/Auth";

export default function Home() {
  const {signOut} = useAauth();
  return (
    <View style={{flex: 1, justifyContent:'center', alignItemns: 'center'}}>
      <Text>Home</Text>
      <Button title="Sair" onPress={() => signOut()} />
    </View>
  );
}