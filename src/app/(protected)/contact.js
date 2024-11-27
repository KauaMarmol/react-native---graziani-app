// app/contact/contact.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function ContactScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !message) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
        } else {
            Alert.alert("Sucesso", "Sua mensagem foi enviada com sucesso!");
            setName('');
            setEmail('');
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entre em Contato</Text>
            <Text style={styles.subtitle}>Envie sua dúvida ou sugestão abaixo:</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Mensagem"
                value={message}
                onChangeText={setMessage}
                multiline={true}
                numberOfLines={4}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            <View style={styles.contactInfoContainer}>
                <Text style={styles.contactInfo}>Ou entre em contato diretamente através do e-mail:</Text>
                <Text style={styles.email}>contato@meuapp.com</Text>
                <Text style={styles.phone}>Telefone: (11) 12345-6789</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 15,
        backgroundColor: '#FFF',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    textArea: {
        height: 120,
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    contactInfoContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    contactInfo: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    email: {
        fontSize: 18,
        color: '#0066cc',
        textAlign: 'center',
        marginBottom: 5,
    },
    phone: {
        fontSize: 18,
        color: '#0066cc',
        textAlign: 'center',
    },
});
