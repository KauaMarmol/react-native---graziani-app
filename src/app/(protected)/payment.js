import { router } from "expo-router";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Payment() {
  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([
    {
      "id": 1,
      "name": "Drew Swine"
    }, {
      "id": 2,
      "name": "Bogart Gossipin"
    }, {
      "id": 3,
      "name": "Cos Armytage"
    }, {
      "id": 4,
      "name": "Vickie Howselee"
    }, {
      "id": 5,
      "name": "Sande Calleja"
    }, {
      "id": 6,
      "name": "Quintilla Handsheart"
    }, {
      "id": 7,
      "name": "Arleen Johnston"
    }, {
      "id": 8,
      "name": "Pepe Costy"
    }, {
      "id": 9,
      "name": "Reese Donneely"
    }, {
      "id": 10,
      "name": "Fritz McElory"
    }, {
      "id": 11,
      "name": "Kermit Gerrad"
    }, {
      "id": 12,
      "name": "Bastien Dymock"
    }, {
      "id": 13,
      "name": "Ewart Marti"
    }, {
      "id": 14,
      "name": "Valma Bonick"
    }, {
      "id": 15,
      "name": "Brannon Simons"
    }, {
      "id": 16,
      "name": "Orton Stammers"
    }, {
      "id": 17,
      "name": "Paton Rediers"
    }, {
      "id": 18,
      "name": "Jacquenette Kingstne"
    }, {
      "id": 19,
      "name": "Vivianne Kearley"
    }, {
      "id": 20,
      "name": "Tammie Latour"
    }, {
      "id": 21,
      "name": "Jamesy Lennarde"
    }, {
      "id": 22,
      "name": "Natka Louisot"
    }, {
      "id": 23,
      "name": "Ofella Cleaveland"
    }, {
      "id": 24,
      "name": "Bridget Manoelli"
    }, {
      "id": 25,
      "name": "Cristobal Kilian"
    }, {
      "id": 26,
      "name": "Sharleen MacKibbon"
    }, {
      "id": 27,
      "name": "Park Brantl"
    }, {
      "id": 28,
      "name": "Julianne Tivolier"
    }, {
      "id": 29,
      "name": "Shoshana Geertje"
    }, {
      "id": 30,
      "name": "Edwina Bownas"
    }, {
      "id": 31,
      "name": "Natalya Slyvester"
    }, {
      "id": 32,
      "name": "Chloe Otridge"
    }, {
      "id": 33,
      "name": "Josey McIllrick"
    }, {
      "id": 34,
      "name": "Blake Archdeckne"
    }, {
      "id": 35,
      "name": "Lewiss Sallery"
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
      <Text>Inserir Pagamentos</Text>
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
        <Button title="Salvar" />
        <Button title="Continuar" />
        <Button title="Cancelar" onPress={() => router.back()} />
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
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  contentButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
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
});