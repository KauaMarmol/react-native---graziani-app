import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useEffect, useState } from "react";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { usePickImage } from "../../utils/pickImage";
import { useConfig } from "../../hooks/Config";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { getPayment, setImagePayment } = usePaymentsDatabase();
  const [payment, setPayment] = useState({});
  const { pickImage } = usePickImage();
  const { directory } = useConfig();

  const fetchData = async () => {
    try {
      const payment = await getPayment(id);
      setPayment(payment);
    } catch (error) {
      Alert.alert("Erro ao buscar pagamento");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePickImage = async () => {
    try {
      const image = await pickImage();
      if (!image) return;
      setPayment({ ...payment, imagem: image });
      await setImagePayment(id, image);
    } catch (error) {
      console.log("handlePickImage: ", error);
      Alert.alert("Erro ao buscar imagem");
    }
  };

  const handleRemoveImage = async () => {
    try {
      setPayment({ ...payment, imagem: "" });
      await setImagePayment(id, "");
    } catch (error) {
      console.log("handleRemoveImage", error);
      Alert.alert("Erro ao remover imagem");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Detalhes - {id || "Sem ID"}</Text>
      <View>
        <Text style={styles.text}>Nome: {payment?.nome}</Text>
        <Text style={styles.text}>
          Data do Pagamento:{" "}
          {formatDateToBrazilian(payment?.data_pagamento || new Date())}
        </Text>
        <Text style={styles.text}>Número do Recibo: {payment?.numero_recibo}</Text>
        <Text style={styles.text}>
          Valor Pago: {formatCurrencyBRL(payment?.valor_pago || 0)}
        </Text>
        <Text style={styles.text}>Observação: {payment?.observacao}</Text>
      </View>
      <View style={styles.contentImage}>
        {payment?.imagem ? (
          <Image
            source={{ uri: `${directory}/${payment?.imagem}` }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.noImageText}>Não há imagem cadastrada</Text>
        )}
      </View>
      <View style={styles.containerButtons}>
        <Button title="Editar" disabled color="#9E9E9E" />
        <Button title="Imagem" onPress={handlePickImage} color="#2196F3" />
        <Button title="Remover Imagem" onPress={handleRemoveImage} color="#F44336" />
        <Button title="Voltar" onPress={() => router.push("list")} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontFamily: "bold",
    fontSize: 22,
    marginBottom: 20,
    color: "#424242",
  },
  text: {
    fontFamily: "regular",
    fontSize: 16,
    color: "#424242",
    marginBottom: 10,
  },
  contentImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  noImageText: {
    fontSize: 14,
    color: "#757575",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
