import { router } from "expo-router";
import { StyleSheet, TextInput, View, Text, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EventRegistration() {
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState(new Date());
  const [localEvento, setLocalEvento] = useState("");
  const [tipoEvento, setTipoEvento] = useState("Festa");
  const [outroTipo, setOutroTipo] = useState("");
  const [viewCalendar, setViewCalendar] = useState(false);

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setDataEvento(selectedDate || dataEvento);
  };

  const handleSubmit = () => {
    if (!nomeEvento || !descricao || !localEvento) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const tipoFinal = tipoEvento === "Outros" ? outroTipo : tipoEvento;

    if (tipoEvento === "Outros" && !outroTipo.trim()) {
      Alert.alert("Erro", "Por favor, insira o tipo de evento.");
      return;
    }

    const eventData = {
      nome: nomeEvento,
      descricao,
      data: dataEvento.toISOString(),
      local: localEvento,
      tipo: tipoFinal,
    };

    console.log("Evento Cadastrado:", eventData);
    Alert.alert("Sucesso", "Evento cadastrado com sucesso!");
    // Aqui você pode adicionar a lógica para salvar o evento no banco de dados
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.headerText}>Cadastro de Evento</Text>

        <View style={styles.inputView}>
          <TextInput
            placeholder="Nome do Evento"
            style={styles.input}
            value={nomeEvento}
            onChangeText={setNomeEvento}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            placeholder="Descrição"
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            placeholder="Local do Evento"
            style={styles.input}
            value={localEvento}
            onChangeText={setLocalEvento}
          />
        </View>

        <View style={styles.inputView}>
          <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
            {dataEvento.toLocaleDateString()}
          </Text>
          {viewCalendar && (
            <DateTimePicker
              value={dataEvento}
              onChange={handleCalendar}
              mode="date"
              testID="dateTimePicker"
            />
          )}
        </View>

        <View style={styles.inputView}>
          <Picker
            selectedValue={tipoEvento}
            onValueChange={(itemValue) => setTipoEvento(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Festa" value="Festa" />
            <Picker.Item label="Show" value="Show" />
            <Picker.Item label="Exposição" value="Exposição" />
            <Picker.Item label="Palestra" value="Palestra" />
            <Picker.Item label="Outros" value="Outros" />
          </Picker>
        </View>

        {tipoEvento === "Outros" && (
          <View style={styles.inputView}>
            <TextInput
              placeholder="Digite o tipo de evento"
              style={styles.input}
              value={outroTipo}
              onChangeText={setOutroTipo}
            />
          </View>
        )}

        <View style={styles.contentButtons}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar Evento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F3F4F6", // Fundo suave cinza claro
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Texto escuro
  },
  inputView: {
    backgroundColor: "#FFFFFF", // Fundo branco nos campos
    borderColor: "#D1D5DB", // Borda cinza clara
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF", // Fundo branco
    borderRadius: 10,
    color: "#333",
  },
  contentButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50", // Verde suave
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "#F87171", // Vermelho suave
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
