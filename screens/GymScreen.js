import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GymScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gym</Text>
            <Text style={styles.content}>Welcome to the Gym section. Here you can find various workouts and exercises to stay fit.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
    },
});