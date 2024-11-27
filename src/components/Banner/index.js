import { useState } from "react";
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
    const [page, setPage] = useState(0);
    const [eventoSelecionado, setEventoSelecionado] = useState(null); // Estado para o evento selecionado

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    const cards = [
        {
            id: "1",
            titulo: "Capiretec",
            categoria: "Festa",
            data: "07 Junho",
            descricao: "Uma festa incrível com muita diversão, música e comida típica.",
            imagem: "https://s4.static.brasilescola.uol.com.br/be/2024/05/baloes-e-enfeites-coloridos-decorando-as-ruas-de-um-bairro-durante-a-festa-junina.jpg",
        },
        {
            id: "2",
            titulo: "EGS - Etec Game Show",
            categoria: "Evento de Games",
            data: "26 Outubro",
            descricao: "Um evento dedicado a gamers com campeonatos e novidades do mundo dos jogos.",
            imagem: "https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/119/2024/10/3.jpg",
        },
        {
            id: "3",
            titulo: "Apresentação de TCC",
            categoria: "Apresentação",
            data: "05 Dezembro",
            descricao: "Apresentação dos Trabalhos de Conclusão de Curso dos alunos da Etec.",
            imagem: "https://www.portaldotcc.com.br/wp-content/uploads/2016/11/tcc-o-que-e.jpg",
        },
    ];

    return (
        <View style={styles.container}>
            {/* Banners */}
            <PagerView initialPage={0} style={styles.content} onPageSelected={onPageSelected}>
                <View key="1" style={styles.page}>
                    <Image
                        source={{
                            uri: "https://s4.static.brasilescola.uol.com.br/be/2024/05/baloes-e-enfeites-coloridos-decorando-as-ruas-de-um-bairro-durante-a-festa-junina.jpg",
                        }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.text}>Banner 1</Text>
                </View>
                <View key="2" style={styles.page}>
                    <Image
                        source={{
                            uri: "https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/119/2024/10/3.jpg",
                        }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.text}>Banner 2</Text>
                </View>
                <View key="3" style={styles.page}>
                    <Image
                        source={{
                            uri: "https://www.portaldotcc.com.br/wp-content/uploads/2016/11/tcc-o-que-e.jpg",
                        }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.text}>Banner 3</Text>
                </View>
            </PagerView>

            {/* Indicadores dos banners */}
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
            </View>
            
            <View>
                <Text style={styles.instructionsText}>
                    Página principal, aqui você pode ver seus eventos mais próximos.
                </Text>
            </View>
            
            {/* Cards */}
            <View style={styles.cardListContainer}>
                <FlatList
                    data={cards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setEventoSelecionado(item)}>
                            <View style={styles.card}>
                                <Image source={{ uri: item.imagem }} style={styles.image} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{item.titulo}</Text>
                                    <Text style={styles.cardCategory}>{item.categoria}</Text>
                                    <Text style={styles.cardDate}>{item.data}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.cardContainer}
                />
            </View>

            {/* Detalhes do evento selecionado */}
            {eventoSelecionado && (
                <View style={styles.eventDetail}>
                    <Text style={styles.detailTitle}>{eventoSelecionado.titulo}</Text>
                    <Image source={{ uri: eventoSelecionado.imagem }} style={styles.detailImage} />
                    <Text style={styles.detailCategory}>{eventoSelecionado.categoria}</Text>
                    <Text style={styles.detailDate}>Data: {eventoSelecionado.data}</Text>
                    <Text style={styles.detailDescription}>{eventoSelecionado.descricao}</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setEventoSelecionado(null)}
                    >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0FFF0", // Cor de fundo
    },
    content: {
        marginTop: 10,
        height: 250,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
    },
    bulletContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 10,
        backgroundColor: "#999",
    },
    activeBullet: {
        backgroundColor: "#000",
    },
    text: {
        fontSize: 20,
        fontFamily: "bold",
        marginTop: 20,
    },
    bannerImage: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginTop: 50,
    },
    instructionsText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "center",
        color: "#333", // Tom mais escuro para contraste
    },
    cardListContainer: {
        padding: 16,
    },
    cardContainer: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#F5FFFA", // cor dos cards
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        overflow: "hidden",
    },
    image: {
        width: 100,
        height: 100,
    },
    cardContent: {
        flex: 1,
        padding: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333", // Título com tom escuro
    },
    cardCategory: {
        fontSize: 14,
        color: "#555",
    },
    cardDate: {
        fontSize: 12,
        color: "#777",
    },
    eventDetail: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    detailImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    detailCategory: {
        fontSize: 16,
        color: "#555",
    },
    detailDate: {
        fontSize: 14,
        color: "#555",
        marginBottom: 10,
    },
    detailDescription: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "#ff6b6b", // Vermelho suave
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

