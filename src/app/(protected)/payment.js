import { router } from "expo-router";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native";

export default function Payment() {
  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([
  {
    "id": 1,
    "nome": "Leoline Giggs"
  }, {
    "id": 2,
    "nome": "Ramsey McIlreavy"
  }, {
    "id": 3,
    "nome": "Germaine Dowdeswell"
  }, {
    "id": 4,
    "nome": "Dane Edgeley"
  }, {
    "id": 5,
    "nome": "Danyette Straniero"
  }, {
    "id": 6,
    "nome": "Edithe Messiter"
  }, {
    "id": 7,
    "nome": "Gregoire Sleet"
  }, {
    "id": 8,
    "nome": "Dunstan Ummfrey"
  }, {
    "id": 9,
    "nome": "Jarad Ollivier"
  }, {
    "id": 10,
    "nome": "Nady Ingliss"
  }, {
    "id": 11,
    "nome": "Krysta Ferroni"
  }, {
    "id": 12,
    "nome": "Pietro Runciman"
  }, {
    "id": 13,
    "nome": "Costanza Pyrke"
  }, {
    "id": 14,
    "nome": "Evangelina Wiggins"
  }, {
    "id": 15,
    "nome": "Brena Taye"
  }, {
    "id": 16,
    "nome": "Caressa Gully"
  }, {
    "id": 17,
    "nome": "Shelli Britten"
  }, {
    "id": 18,
    "nome": "Lynnea Forrest"
  }, {
    "id": 19,
    "nome": "Joy Winnard"
  }, {
    "id": 20,
    "nome": "Everard Cromb"
  }, {
    "id": 21,
    "nome": "Anthony Aldersley"
  }, {
    "id": 22,
    "nome": "Leo Pinard"
  }, {
    "id": 23,
    "nome": "Donnell Goldingay"
  }, {
    "id": 24,
    "nome": "Jemmy Westby"
  }, {
    "id": 25,
    "nome": "Ahmed Godbolt"
  }, {
    "id": 26,
    "nome": "Francyne Ferenc"
  }, {
    "id": 27,
    "nome": "Brandy Brydie"
  }, {
    "id": 28,
    "nome": "Randene Pesik"
  }, {
    "id": 29,
    "nome": "Camey Work"
  }, {
    "id": 30,
    "nome": "Ignazio Maides"
  }, {
    "id": 31,
    "nome": "Joan Abelwhite"
  }, {
    "id": 32,
    "nome": "Allsun O'Lahy"
  }, {
    "id": 33,
    "nome": "Carlota Tonsley"
  }, {
    "id": 34,
    "nome": "Ludovika Cuthbert"
  }, {
    "id": 35,
    "nome": "Reidar Slay"
  }
]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObservacao] = useState("");

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  }

  return (
    <View style={styles.content}>
      <Text style={styles.headerText}>Inserir Pagamentos</Text>
      <View style={styles.inputView}>
        <Ionicons name="wallet-outline" size={24} color="black" />
        <TextInput placeholder="Valor" keyboardType="decimal-pad" style={styles.inputValor} value={valor} onChangeText={setValor} />
      </View>
      <View style={styles.inputView}>
        <Picker selectedValue={id} onValueChange={(itemValue, index) => {
          setId(itemValue)
        }}
          style={{ width: "100%" }}
        >
          {
            sugestoes?.map((item) => {
              return (
                <Picker.Item key={item.id} label={item.nome} value={item.id} />
              );
            })}
        </Picker>
      </View>
      <View style={styles.inputView}>
        <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
          {data.toLocaleDateString().split("T")[0]}
        </Text>
        {viewCalendar && (
          <DateTimePicker
            value={data}
            onChange={handleCalendar}
            mode="date"
            testID="dateTimePicker"
          />
        )}
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Observações"
          style={styles.inputObservacao}
          value={observacao}
          onChangeText={setObservacao}
          multiline={true}
        />
      </View>
      <View style={styles.contentButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
  },
  contentButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
    marginTop: 20,
  },
  inputValor: {
    flex: 1,
    textAlign: "right",
    padding: 10,
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 20,
    padding: 10,
  },
  inputObservacao: {
    fontFamily: "regular",
    fontSize: 16,
    flex: 1,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});