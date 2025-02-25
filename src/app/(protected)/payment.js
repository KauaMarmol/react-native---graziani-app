import { router } from "expo-router";
import { StyleSheet, Button, TextInput, View, Text, Platform, KeyboardAvoidingView, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native";
import { z } from "zod";
import { useAuth } from "../../hooks/Auth/index";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useUsersDatabase } from "../../database/useUsersDatabase";

const paymentSchema = z.object({
  valor_pago: z.number().gt(0),
  user_id: z.number().int().positive(),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.string().datetime(),
  numero_recibo: z.string(),
  observacao: z.string().optional(),
});

export default function Payment() {
  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [numeroRecibo, setNumeroRecibo] = useState("");
  const valueRef = useRef();
  const { user } = useAuth()
  const { createPayment } = usePaymentsDatabase();
  const { getAllUsers } = useUsersDatabase();

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  useEffect(() => {
    (async () => {
      valueRef?.current?.focus();
      try {
        const users = await getAllUsers();
        setSugestoes(users);
        setId(users[0].id); //eu excluí o [0] pq estava dando erro, mas coloquei de volta
    } catch (error) {
      console.log(error);
    }
    })();
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

  const handleSubmit = async () => {
    const payment = {
      user_id: id,
      user_cadastro: Number(user.user.id),
      valor_pago: convertValue(valor),
      data_pagamento: data.toISOString(),
      numero_recibo: numeroRecibo,
      observacao,
    };

    try {
      const result = await paymentSchema.parseAsync(payment);
      payment.data_pagamento = data.toISOString().replace("T", " ").split(".")[0];
      const { insertedID } = await createPayment(payment);
      console.log(insertedID);
      setValor("0,00");
      setId(sugestoes[0].id); 
      setData(new Date());
      setObservacao("");
      setNumeroRecibo("");
      valueRef?.current?.focus();
    } catch (error) {
      Alert.alert("Erro", `Erro ao inserir pagamento: ${error.message}`);
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
          <Ionicons name="cash-outline" size={24} color="black" />
          <TextInput placeholder="Número do Recibo" keyboardType="decimal-pad" style={styles.inputValor} value={numeroRecibo} onChangeText={setNumeroRecibo} />
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
          <TouchableOpacity style={styles.buttonSalvar} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonContinuar}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancelar} onPress={() => router.back()}>
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
    backgroundColor: "#F5F5F5", // Fundo suave
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4A4A4A", // Cor de texto suave
  },
  inputView: {
    borderColor: "#B0BEC5", // Cinza claro
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF", // Fundo branco para entradas
    shadowColor: "#000", // Sombra suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputValor: {
    flex: 1,
    textAlign: "right",
    padding: 10,
    fontSize: 16,
    color: "#424242", // Texto escuro
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 20,
    padding: 10,
    color: "#4A4A4A", // Texto neutro
  },
  inputObservacao: {
    fontFamily: "regular",
    fontSize: 16,
    flex: 1,
    lineHeight: 20,
    color: "#424242", // Texto escuro
  },
  contentButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonSalvar: {
    backgroundColor: "#4CAF50", // Verde para "Salvar"
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContinuar: {
    backgroundColor: "#00FFFF", // Verde-água para "Continuar"
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonCancelar: {
    backgroundColor: "#F44336", // Vermelho para "Cancelar"
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF", // Texto branco para todos os botões
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
