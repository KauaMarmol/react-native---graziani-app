import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { FlashList } from "@shopify/flash-list";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { router } from "expo-router";

export default function List() {
  const { getPayments } = usePaymentsDatabase();
  const [page, setPage] = useState(0); // Controla qual página do sistema já carregou
  const [loading, setLoading] = useState(true); // Controla se está carregando os dados do banco
  const [hasMore, setHasMore] = useState(true); // Controla se tem mais dados para carregar
  const [data, setData] = useState([]);

  async function fetchData() {
    if (!hasMore) return; // Se não tem mais dados para carregar, sai da função

    setPage((prevPage) => prevPage + 1); // Incrementa a página
    const payments = await getPayments(page); // Busca os pagamentos no banco

    if (payments.length < 5) setHasMore(false); // Menos de 5 registros = fim dos dados
    setData((prevData) => [...prevData, ...payments]); // Adiciona os novos pagamentos ao estado atual
    setLoading(false); // Marca o carregamento como finalizado
  }

  useEffect(() => {
    setPage(0); // Reinicia a página na primeira renderização
    fetchData(); // Carrega os dados iniciais
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        router.push({
          pathname: "details",
          params: { id: item.id },
        })
      }
    >
      <View style={styles.contentItem}>
        <Text style={styles.name}>{item.nome}</Text>
        <View style={styles.contentDate}>
          <Text style={styles.date}>{formatDateToBrazilian(item.data_pagamento || new Date())}</Text>
          <Text style={styles.receipt}>{item.numero_recibo}</Text>
        </View>
      </View>
      <View style={styles.valueContent}>
        <Text style={styles.value}>{formatCurrencyBRL(item.valor_pago || 0)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={50}
        onEndReached={fetchData}
        onEndReachedThreshold={0.8}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={loading && <Text style={styles.loadingText}>Carregando...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5", // Fundo claro
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    height: 75,
  },
  contentItem: {
    flex: 1,
    gap: 5,
  },
  contentDate: {
    flexDirection: "row",
    gap: 10,
  },
  name: {
    fontFamily: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    color: "#424242", // Texto escuro
  },
  date: {
    fontFamily: "regular",
    fontSize: 14,
    color: "#757575", // Cinza
  },
  receipt: {
    fontFamily: "regular",
    fontSize: 14,
    color: "#757575", // Cinza
  },
  valueContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontFamily: "bold",
    fontSize: 18,
    color: "#4CAF50", // Verde para valores
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#757575",
    marginTop: 10,
  },
});
