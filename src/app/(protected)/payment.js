import { router } from "expo-router";
import { StyleSheet, Button, TextInput, View, Text, Platform, KeyboardAvoidingView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native";
import { z } from "zod";
import { useAuth } from "../../hooks/Auth/index";

const paymentSchema = z.object({
  valor_pago: z.number().gt(0), 
  user_id: z.number().int().positive(),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.date(),
  observacao: z.string(),
});

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
  const valueRef = useRef();
  const {user} = useAuth()

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  useEffect(() => {
    valueRef?.current?.focus();
  }, [])

  const handleChangeValor = (value) => {
    try {
      const valorLimpo = value.replace(",", "").replace(".", "");
      console.log("Valor Limpo: ", valorLimpo);
      const valorConvertido = Number(valorLimpo) / 100;
      console.log("Valor Convertido: ", valorConvertido);
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        setValor("0,00")
        return;
      }
      let valorPtBR = Intl.NumberFormat("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      }).format(valorConvertido);
      setValor(valorPtBR);
    } catch (error) {
      setValor("0,00");
    }
  };


const convertValue = (value) => {
  try {
    const valorLimpo = value.replace(",", "").replace(".", "");
    const valorConvertido = Number(valorLimpo) / 100;
    if (valorConvertido === 0 || isNaN(valorConvertido)) {
      return 0
    }
    return valorConvertido
  } catch (error) {
    return valorConvertido;
  }
}

  const handleSubmit = async ()=> {
    const payment = {
      user_id: id,
      user_cadastro: Number(user.user.id),
      valor_pago: convertValue(valor),
      data_pagamento: data,
      observacao,
    };
    try {
      const result = await paymentSchema.parseAsync(payment);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Inserir Pagamentos</Text>
        <View style={styles.inputView}>
          <Ionicons name="wallet-outline" size={24} color="black" />
          <TextInput placeholder="Valor" keyboardType="decimal-pad" style={styles.inputValor} value={valor} onChangeText={(newValue) => handleChangeValor(newValue)} ref={valueRef} />
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    </KeyboardAvoidingView>
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