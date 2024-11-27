import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/Auth/index';

function CustomDrawerContent(props) {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://www.github.com/KauaMarmol.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user?.user?.nome}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={() => signOut()} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Principal",
            headerTitle: "Principal",
            drawerIcon: () => (<Ionicons name="home-outline" size={20} color="black" />),
          }}
        />
        <Drawer.Screen
          name="list"
          options={{
            drawerLabel: "Listagem",
            headerTitle: "Listagem",
            drawerIcon: () => (<Ionicons name="list-circle-outline" size={20} color="black" />),
          }}
        />
        <Drawer.Screen
          name="payment"
          options={{
            drawerLabel: "Pagamentos",
            headerTitle: "Pagamentos",
            drawerIcon: () => (<Ionicons name="diamond-outline" size={20} color="black" />),
          }}
        />
        <Drawer.Screen
          name="events"
          options={{
            drawerLabel: "Eventos",
            headerTitle: "Cadastro de Eventos",
            drawerIcon: () => (<Ionicons name="calendar-outline" size={20} color="black" />),
          }}
        />
        <Drawer.Screen
          name="contact" // A rota foi corrigida para "contact"
          options={{
            drawerLabel: "Contato",
            headerTitle: "Entre em Contato",
            drawerIcon: () => (<Ionicons name="mail-outline" size={20} color="black" />),
          }}
        />
        <Drawer.Screen
          name="details"
          options={{
            unmountOnBlur: true,
            headerTitle: "Detalhes",
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default function Layout() {
  return DrawerLayout();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#0066cc',
  },
  userName: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "regular",
    marginTop: 10,
    color: '#333',
  },
  signOutButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    margin: 10,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  signOutText: {
    color: "white",
    fontFamily: "bold",
    fontSize: 16,
  },
});
